import { describe, it, expect } from "vitest";
import { flattenObject } from ".";

describe("flattenObject", () => {
  it("should flatten a nested object", () => {
    const input = { a: 1, b: { c: 2, d: 3 }, e: 4 };
    const expected = { a: 1, "b.c": 2, "b.d": 3, e: 4 };
    expect(flattenObject(input)).toEqual(expected);
  });

  it("should handle empty objects", () => {
    const input = {};
    const expected = {};
    expect(flattenObject(input)).toEqual(expected);
  });

  it("should handle objects with null values", () => {
    const input = { a: null, b: { c: null } };
    const expected = { a: null, "b.c": null };
    expect(flattenObject(input)).toEqual(expected);
  });

  it("should handle deeply nested objects", () => {
    const input = { a: { b: { c: { d: 5 } } } };
    const expected = { "a.b.c.d": 5 };
    expect(flattenObject(input)).toEqual(expected);
  });

  it("should handle objects with arrays", () => {
    const input = { a: [1, 2, 3], b: { c: 4 } };
    const expected = { "a.0": 1, "a.1": 2, "a.2": 3, "b.c": 4 };
    expect(flattenObject(input)).toEqual(expected);
  });
});
