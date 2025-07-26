import { sum } from "@/sum";
import { describe, it, expect } from "vitest";

describe("sum function", () => {
  it("should return the sum of two numbers", () => {
    const result = sum(1, 2);
    expect(result).toBe(3);
  });

  it("should handle negative numbers", () => {
    const result = sum(-1, -2);
    expect(result).toBe(-3);
  });

  it("should return zero when both numbers are zero", () => {
    const result = sum(0, 0);
    expect(result).toBe(0);
  });
});
