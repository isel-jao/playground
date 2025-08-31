import { describe, it, expect } from "vitest";
import { cache } from "./index";

describe("Cache Manager", () => {
  it("should set and get a value from the cache", async () => {
    await cache.set("key", "value");
    const value = await cache.get("key");
    expect(value).toBe("value");
  });
});
