#!/usr/bin/env python3
"""Fail-closed verification of the Cordova access policy inside a built APK."""
from __future__ import annotations
import argparse
import struct
import sys
import zipfile
from pathlib import Path
import xml.etree.ElementTree as ET

APK_PATHS = {
    "assessment-signed": Path("android/app/build/outputs/apk/release/jestbox-hardened-assessment-signed.apk"),
    "release-unsigned": Path("android/app/build/outputs/apk/release/app-release-unsigned.apk"),
    "release-signed": Path("android/app/build/outputs/apk/release/jestbox-release-signed.apk"),
}
ALLOWED_ORIGIN = "http://localhost"
NO_INDEX = 0xFFFFFFFF

class VerificationError(Exception):
    pass

class BinaryXmlError(VerificationError):
    pass

def local_name(tag):
    return tag.rsplit("}", 1)[-1] if isinstance(tag, str) else tag

def _length8(data: bytes, offset: int) -> tuple[int, int]:
    if offset >= len(data):
        raise BinaryXmlError("Truncated UTF-8 string length")
    first = data[offset]
    if first & 0x80:
        if offset + 1 >= len(data):
            raise BinaryXmlError("Truncated extended UTF-8 string length")
        return ((first & 0x7F) << 8) | data[offset + 1], 2
    return first, 1

def _length16(data: bytes, offset: int) -> tuple[int, int]:
    if offset + 2 > len(data):
        raise BinaryXmlError("Truncated UTF-16 string length")
    first = struct.unpack_from("<H", data, offset)[0]
    if first & 0x8000:
        if offset + 4 > len(data):
            raise BinaryXmlError("Truncated extended UTF-16 string length")
        second = struct.unpack_from("<H", data, offset + 2)[0]
        return ((first & 0x7FFF) << 16) | second, 4
    return first, 2

def _parse_string_pool(data: bytes, offset: int, header_size: int, chunk_size: int) -> list[str]:
    if header_size < 28 or chunk_size < header_size:
        raise BinaryXmlError("Invalid Android XML string-pool header")
    count, _styles, flags, strings_start, _styles_start = struct.unpack_from("<IIIII", data, offset + 8)
    if count > 100000 or offset + 28 + count * 4 > offset + chunk_size:
        raise BinaryXmlError("Invalid Android XML string-pool offsets")
    offsets = struct.unpack_from("<" + "I" * count, data, offset + 28) if count else ()
    strings = []
    utf8 = bool(flags & 0x100)
    for relative in offsets:
        position = offset + strings_start + relative
        if position >= offset + chunk_size:
            raise BinaryXmlError("Android XML string points outside its pool")
        if utf8:
            _utf16_length, first_size = _length8(data, position)
            position += first_size
            byte_length, second_size = _length8(data, position)
            position += second_size
            end = position + byte_length
            if end > offset + chunk_size:
                raise BinaryXmlError("Android XML UTF-8 string exceeds its pool")
            strings.append(data[position:end].decode("utf-8"))
        else:
            char_length, prefix_size = _length16(data, position)
            position += prefix_size
            end = position + char_length * 2
            if end > offset + chunk_size:
                raise BinaryXmlError("Android XML UTF-16 string exceeds its pool")
            strings.append(data[position:end].decode("utf-16le"))
    return strings

def parse_android_binary_xml(data: bytes) -> ET.Element:
    """Decode the structural subset of Android binary XML needed for policy checks."""
    if len(data) < 8:
        raise BinaryXmlError("Truncated Android XML document")
    document_type, header_size, total_size = struct.unpack_from("<HHI", data, 0)
    if document_type != 0x0003 or header_size < 8 or total_size != len(data):
        raise BinaryXmlError("Not a valid Android binary XML document")

    position = header_size
    strings = None
    stack: list[ET.Element] = []
    root = None
    while position < len(data):
        if position + 8 > len(data):
            raise BinaryXmlError("Truncated Android XML chunk header")
        chunk_type, chunk_header_size, chunk_size = struct.unpack_from("<HHI", data, position)
        if chunk_header_size < 8 or chunk_size < chunk_header_size or position + chunk_size > len(data):
            raise BinaryXmlError("Invalid Android XML chunk bounds")

        if chunk_type == 0x0001:  # RES_STRING_POOL_TYPE
            strings = _parse_string_pool(data, position, chunk_header_size, chunk_size)
        elif chunk_type == 0x0102:  # RES_XML_START_ELEMENT_TYPE
            if strings is None or chunk_header_size < 16 or chunk_size < 36:
                raise BinaryXmlError("Invalid Android XML start-element chunk")
            _namespace_index, name_index, attribute_start, attribute_size, attribute_count = struct.unpack_from(
                "<IIHHH", data, position + 16
            )
            if name_index >= len(strings) or attribute_size < 20:
                raise BinaryXmlError("Invalid Android XML element or attribute metadata")
            element = ET.Element(strings[name_index])
            attributes_base = position + 16 + attribute_start
            if attributes_base + attribute_count * attribute_size > position + chunk_size:
                raise BinaryXmlError("Android XML attributes exceed their element chunk")
            for index in range(attribute_count):
                attribute = attributes_base + index * attribute_size
                _attribute_namespace, attribute_name, raw_value = struct.unpack_from("<III", data, attribute)
                _value_size, _reserved, value_type, typed_value = struct.unpack_from("<HBBI", data, attribute + 12)
                if attribute_name >= len(strings):
                    raise BinaryXmlError("Invalid Android XML attribute-name index")
                if raw_value != NO_INDEX:
                    if raw_value >= len(strings):
                        raise BinaryXmlError("Invalid Android XML raw-value index")
                    value = strings[raw_value]
                elif value_type == 0x03:  # TYPE_STRING
                    if typed_value >= len(strings):
                        raise BinaryXmlError("Invalid Android XML typed-string index")
                    value = strings[typed_value]
                elif value_type == 0x12:  # TYPE_INT_BOOLEAN
                    value = "true" if typed_value else "false"
                else:
                    value = str(typed_value)
                element.set(strings[attribute_name], value)

            if stack:
                stack[-1].append(element)
            elif root is None:
                root = element
            else:
                raise BinaryXmlError("Android XML contains multiple document roots")
            stack.append(element)
        elif chunk_type == 0x0103:  # RES_XML_END_ELEMENT_TYPE
            if strings is None or chunk_header_size < 16 or not stack:
                raise BinaryXmlError("Unexpected Android XML end-element chunk")
            _namespace_index, name_index = struct.unpack_from("<II", data, position + 16)
            if name_index >= len(strings) or strings[name_index] != stack[-1].tag:
                raise BinaryXmlError("Mismatched Android XML end-element")
            stack.pop()
        position += chunk_size

    if root is None or stack:
        raise BinaryXmlError("Incomplete Android binary XML document")
    return root

def verify_element(root: ET.Element) -> dict:
    if local_name(root.tag) != "widget":
        raise VerificationError("Packaged Cordova config root is not <widget>.")
    rules = [node for node in root.iter() if local_name(node.tag) == "access"]
    if not rules:
        raise VerificationError("Packaged Cordova config contains no <access> rule.")
    origins = []
    for rule in rules:
        origin = rule.get("origin")
        if not origin:
            raise VerificationError("Packaged <access> rule has no origin attribute.")
        origins.append(origin)
    unexpected = sorted(set(origins) - {ALLOWED_ORIGIN})
    if unexpected:
        raise VerificationError("Unapproved packaged Cordova access origin(s): " + ", ".join(unexpected))
    return {"result": "passed", "accessRuleCount": len(rules), "accessOrigins": origins, "wildcardOrigins": 0}

def verify_config(xml_text: str) -> dict:
    try:
        root = ET.fromstring(xml_text)
    except ET.ParseError as exc:
        raise VerificationError(f"Invalid packaged Cordova config XML: {exc}") from exc
    return verify_element(root)

def verify_apk(apk: Path) -> dict:
    try:
        with zipfile.ZipFile(apk) as archive:
            xml_paths = sorted(name for name in archive.namelist() if name.startswith("res/") and name.endswith(".xml"))
            if not xml_paths:
                raise VerificationError("APK contains no packaged res/*.xml resources.")
            reports = []
            for resource in xml_paths:
                try:
                    root = parse_android_binary_xml(archive.read(resource))
                except (BinaryXmlError, UnicodeDecodeError, struct.error):
                    continue
                if local_name(root.tag) == "widget":
                    report = verify_element(root)
                    report["resource"] = resource
                    reports.append(report)
    except (zipfile.BadZipFile, OSError) as exc:
        raise VerificationError(f"Unable to read APK: {exc}") from exc

    if len(reports) != 1:
        raise VerificationError(f"Expected exactly one packaged Cordova <widget> resource; found {len(reports)}.")
    return reports[0]

def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--artifact", choices=tuple(APK_PATHS), default="assessment-signed")
    args = parser.parse_args()
    apk = APK_PATHS[args.artifact].resolve()
    if not apk.is_relative_to(Path.cwd().resolve()) or not apk.is_file():
        print("ERROR: APK path is missing or outside the workspace.", file=sys.stderr)
        return 2
    try:
        report = verify_apk(apk)
    except VerificationError as exc:
        print(f"ERROR: packaged Cordova policy verification failed: {exc}", file=sys.stderr)
        return 1
    report["apk"] = apk.name
    report["apkBytes"] = apk.stat().st_size
    print(report)
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
