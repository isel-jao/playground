import { describe, expect, it } from "vitest";
import { add } from "./index.js";

describe("add", () => {
  it("should add two numbers", () => {
    expect(add(1, 2)).toBe(3);
    expect(add(-1, 1)).toBe(0);
    expect(add(0, 0)).toBe(0);
  });
});
