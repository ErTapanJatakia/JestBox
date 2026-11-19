import test from "node:test";
import assert from "node:assert/strict";
import { restrictCordovaAccess } from "../scripts/android-config-utils.mjs";

test("removes wildcard Cordova access while preserving explicit origins", () => {
  const input = [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<widget>',
    '  <access origin="*" />',
    '  <access origin="https://trusted.example" />',
    '</widget>'
  ].join("\n");

  const result = restrictCordovaAccess(input);

  assert.equal(result.removed, 1);
  assert.doesNotMatch(result.xml, /<access\\b[^>]*origin=["']\\*["']/);
  assert.match(result.xml, /<access origin="https:\/\/trusted\\.example" \/>/);
});

test("is idempotent when no wildcard access is present", () => {
  const input = '<widget><access origin="https://trusted.example" /></widget>';
  const result = restrictCordovaAccess(input);

  assert.equal(result.removed, 0);
  assert.equal(result.xml, input);
});

test("removes every wildcard access declaration", () => {
  const input = '<widget><access origin="*" /><access origin="*" /></widget>';
  const result = restrictCordovaAccess(input);

  assert.equal(result.removed, 2);
  assert.doesNotMatch(result.xml, /<access\\b[^>]*origin=["']\\*["']/);
});

test("rejects non-string XML input", () => {
  assert.throws(() => restrictCordovaAccess(null), TypeError);
});
