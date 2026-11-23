import sys
import struct
import unittest
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
from verify_android_apk_config import (
    BinaryXmlError, VerificationError, parse_android_binary_xml, verify_config, verify_element,
)

NO_INDEX = 0xFFFFFFFF

def _len8(value):
    if value < 0x80:
        return bytes([value])
    return bytes([0x80 | (value >> 8), value & 0xFF])

def _string_pool(strings):
    encoded = []
    offsets = []
    for value in strings:
        raw = value.encode("utf-8")
        encoded.append(_len8(len(value)) + _len8(len(raw)) + raw + b"\0")
        offsets.append(sum(map(len, encoded[:-1])))
    strings_start = 28 + 4 * len(strings)
    payload = b"".join(encoded)
    size = strings_start + len(payload)
    header = struct.pack("<HHIIIIII", 1, 28, size, len(strings), 0, 0x100, strings_start, 0)
    return header + struct.pack("<" + "I" * len(offsets), *offsets) + payload

def _start_element(namespace_index, name_index, attributes=()):
    size = 36 + 20 * len(attributes)
    chunk = struct.pack("<HHI", 0x0102, 16, size)
    chunk += struct.pack("<II", 1, NO_INDEX)
    chunk += struct.pack("<IIHHHHHH", namespace_index, name_index, 20, 20, len(attributes), 0, 0, 0)
    for namespace, name, raw in attributes:
        chunk += struct.pack("<IIIHBBI", namespace, name, raw, 8, 0, 3, raw)
    return chunk

def _end_element(namespace_index, name_index):
    return struct.pack("<HHIIII", 0x0103, 16, 24, 1, NO_INDEX, namespace_index) + struct.pack("<I", name_index)

def build_binary_xml(origin):
    strings = ["http://www.w3.org/ns/widgets", "widget", "access", "origin", origin]
    chunks = [
        _string_pool(strings),
        _start_element(0, 1),
        _start_element(0, 2, [(NO_INDEX, 3, 4)]),
        _end_element(0, 2),
        _end_element(0, 1),
    ]
    body = b"".join(chunks)
    return struct.pack("<HHI", 3, 8, 8 + len(body)) + body

class PackagedCordovaConfigTests(unittest.TestCase):
    def test_accepts_localhost_only(self):
        self.assertEqual(verify_config('<widget><access origin="http://localhost" /></widget>')["result"], "passed")
    def test_accepts_namespaced_cordova_config(self):
        xml = '<widget xmlns="http://www.w3.org/ns/widgets"><access origin="http://localhost" /></widget>'
        self.assertEqual(verify_config(xml)["accessOrigins"], ["http://localhost"])
    def test_rejects_wildcard(self):
        with self.assertRaisesRegex(VerificationError, "Unapproved"):
            verify_config('<widget><access origin="*" /></widget>')
    def test_rejects_external_origin(self):
        with self.assertRaisesRegex(VerificationError, "Unapproved"):
            verify_config('<widget><access origin="http://localhost"/><access origin="https://example.com"/></widget>')
    def test_checks_all_access_rules(self):
        with self.assertRaisesRegex(VerificationError, "Unapproved"):
            verify_config('<widget><access origin="http://localhost"/><access origin="*"/></widget>')
    def test_rejects_missing_access_policy(self):
        with self.assertRaisesRegex(VerificationError, "no <access>"):
            verify_config("<widget />")
    def test_rejects_missing_origin(self):
        with self.assertRaisesRegex(VerificationError, "no origin"):
            verify_config("<widget><access /></widget>")
    def test_rejects_invalid_xml_or_wrong_root(self):
        with self.assertRaisesRegex(VerificationError, "Invalid"):
            verify_config("<widget>")
        with self.assertRaisesRegex(VerificationError, "root"):
            verify_config("<manifest />")
    def test_decodes_android_binary_xml(self):
        root = parse_android_binary_xml(build_binary_xml("http://localhost"))
        self.assertEqual(verify_element(root)["accessOrigins"], ["http://localhost"])
    def test_binary_xml_rejects_wildcard(self):
        root = parse_android_binary_xml(build_binary_xml("*"))
        with self.assertRaisesRegex(VerificationError, "Unapproved"):
            verify_element(root)
    def test_binary_xml_rejects_external_origin(self):
        root = parse_android_binary_xml(build_binary_xml("https://example.com"))
        with self.assertRaisesRegex(VerificationError, "Unapproved"):
            verify_element(root)
    def test_binary_xml_rejects_truncated_document(self):
        with self.assertRaises(BinaryXmlError):
            parse_android_binary_xml(b"\x03\x00\x08\x00")

if __name__ == "__main__":
    unittest.main()
