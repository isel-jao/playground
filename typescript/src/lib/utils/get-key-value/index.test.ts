import { describe, it, expect } from "vitest";
import { getKeyValue } from ".";

describe("getKeyValue", () => {
  it("should return the value for a simple key", () => {
    const obj = { a: 1, b: 2 };
    expect(getKeyValue(obj, "a")).toBe(1);
    expect(getKeyValue(obj, "b")).toBe(2);
  });

  it("should return the value for a nested key", () => {
    const obj = { a: { b: { c: 3 } } };
    expect(getKeyValue(obj, "a.b.c")).toBe(3);
    expect(getKeyValue(obj, "a.b")).toEqual({ c: 3 });
    expect(getKeyValue(obj, "a")).toEqual({ b: { c: 3 } });
    expect(getKeyValue(obj, "a.b.c.d")).toBeUndefined();
  });

  it("should return undefined for non-existent keys", () => {
    const obj = { a: 1, b: 2 };
    expect(getKeyValue(obj, "c")).toBeUndefined();
    expect(getKeyValue(obj, "a.b")).toBeUndefined();
    expect(getKeyValue(obj, "b.c")).toBeUndefined();
  });

  it("should handle non-object inputs gracefully", () => {
    expect(getKeyValue(null, "a")).toBeUndefined();
    expect(getKeyValue(undefined, "a")).toBeUndefined();
    expect(getKeyValue(42, "a")).toBeUndefined();
    expect(getKeyValue("string", "a")).toBeUndefined();
  });

  it("should handle keys with special characters", () => {
    const obj = { "a.b": { "c.d": 4 } };
    expect(getKeyValue(obj, "a.b.c.d")).toBeUndefined();
    expect(getKeyValue(obj, "a.b")).toEqual({ "c.d": 4 });
    expect(getKeyValue(obj, "a.b.c.d.e")).toBeUndefined();
  });

  it("should handle Map objects", () => {
    const map = new Map();
    map.set("name", "Alice");
    map.set("age", 30);
    map.set("nested", { city: "New York", country: "USA" });

    expect(getKeyValue(map, "name")).toBe("Alice");
    expect(getKeyValue(map, "age")).toBe(30);
    expect(getKeyValue(map, "nested")).toEqual({
      city: "New York",
      country: "USA",
    });
    expect(getKeyValue(map, "nonexistent")).toBeUndefined();
  });

  it("should handle Map objects with complex keys", () => {
    const map = new Map();
    const keyObj = { id: 1 };
    const keySymbol = Symbol("test");

    map.set("string.key", "value1");
    map.set(keyObj, "object key value");
    map.set(keySymbol, "symbol key value");
    map.set(123, "number key value");

    expect(getKeyValue(map, "string.key")).toBe("value1");
    expect(getKeyValue(map, keyObj.toString())).toBeUndefined(); // Maps use reference equality
    expect(getKeyValue(map, "123")).toBeUndefined(); // Number keys don't match string keys
  });

  it("should handle nested Maps", () => {
    const innerMap = new Map();
    innerMap.set("level2", "deep value");

    const outerMap = new Map();
    outerMap.set("level1", innerMap);
    outerMap.set("simple", "simple value");

    expect(getKeyValue(outerMap, "simple")).toBe("simple value");
    expect(getKeyValue(outerMap, "level1")).toBe(innerMap);
    // Note: Dot notation doesn't work with nested Maps since Map access is different
    expect(getKeyValue(outerMap, "level1.level2")).toBe("deep value");
  });

  it("should handle nested values inside Map objects", () => {
    const map = new Map();
    map.set("user", {
      name: "Alice",
      profile: {
        age: 30,
        address: {
          city: "New York",
          country: "USA",
        },
      },
    });
    map.set("config", {
      database: {
        host: "localhost",
        port: 5432,
      },
    });

    // Test accessing nested object properties from Map values
    const userProfile = getKeyValue(map, "user.profile");
    expect(userProfile).toEqual({
      age: 30,
      address: {
        city: "New York",
        country: "USA",
      },
    });

    // Test direct dot notation access through Map
    expect(getKeyValue(map, "user.name")).toBe("Alice");
    expect(getKeyValue(map, "user.profile.age")).toBe(30);
    expect(getKeyValue(map, "user.profile.address.city")).toBe("New York");
    expect(getKeyValue(map, "user.profile.address.country")).toBe("USA");

    // Test direct config access through Map
    expect(getKeyValue(map, "config.database.host")).toBe("localhost");
    expect(getKeyValue(map, "config.database.port")).toBe(5432);

    // Test non-existent nested paths through Map
    expect(getKeyValue(map, "user.profile.nonexistent")).toBeUndefined();
    expect(getKeyValue(map, "user.profile.address.zipcode")).toBeUndefined();
    expect(getKeyValue(map, "nonexistent.key")).toBeUndefined();
  });

  it("should handle arrays with numeric indices", () => {
    const obj = {
      items: ["first", "second", "third"],
      nested: {
        list: [{ name: "item1" }, { name: "item2" }],
      },
    };

    expect(getKeyValue(obj, "items.0")).toBe("first");
    expect(getKeyValue(obj, "items.1")).toBe("second");
    expect(getKeyValue(obj, "items.2")).toBe("third");
    expect(getKeyValue(obj, "items.3")).toBeUndefined();
    expect(getKeyValue(obj, "nested.list.0.name")).toBe("item1");
    expect(getKeyValue(obj, "nested.list.1.name")).toBe("item2");
  });

  it("should handle empty strings and whitespace keys", () => {
    const obj = {
      "": "empty key",
      " ": "space key",
      "  ": "double space key",
      "\t": "tab key",
      "\n": "newline key",
    };

    expect(getKeyValue(obj, "")).toBe("empty key");
    expect(getKeyValue(obj, " ")).toBe("space key");
    expect(getKeyValue(obj, "  ")).toBe("double space key");
    expect(getKeyValue(obj, "\t")).toBe("tab key");
    expect(getKeyValue(obj, "\n")).toBe("newline key");
  });

  it("should handle objects with prototype properties", () => {
    function TestClass(this: any) {
      this.instanceProp = "instance";
    }
    (TestClass as any).prototype.prototypeProp = "prototype";

    const obj = new (TestClass as any)();

    expect(getKeyValue(obj, "instanceProp")).toBe("instance");
    expect(getKeyValue(obj, "prototypeProp")).toBe("prototype");
  });

  it("should handle circular references", () => {
    const obj: any = { name: "root" };
    obj.self = obj;
    obj.nested = { parent: obj };

    expect(getKeyValue(obj, "name")).toBe("root");
    expect(getKeyValue(obj, "self")).toBe(obj);
    expect(getKeyValue(obj, "nested.parent")).toBe(obj);
    expect(getKeyValue(obj, "self.name")).toBe("root");
    expect(getKeyValue(obj, "nested.parent.name")).toBe("root");
  });

  it("should handle very deep nesting", () => {
    const obj = {
      level1: {
        level2: {
          level3: {
            level4: {
              level5: {
                deepValue: "found it!",
              },
            },
          },
        },
      },
    };

    expect(
      getKeyValue(obj, "level1.level2.level3.level4.level5.deepValue")
    ).toBe("found it!");
    expect(getKeyValue(obj, "level1.level2.level3.level4.level5")).toEqual({
      deepValue: "found it!",
    });
    expect(
      getKeyValue(obj, "level1.level2.level3.level4.level5.nonexistent")
    ).toBeUndefined();
  });

  it("should handle objects with symbol keys", () => {
    const symbolKey = Symbol("test");
    const obj = {
      [symbolKey]: "symbol value",
      regular: "regular value",
    };

    expect(getKeyValue(obj, "regular")).toBe("regular value");
    // Symbol keys are not enumerable in for...in loops and don't work with string access
    expect(getKeyValue(obj, symbolKey.toString())).toBeUndefined();
  });

  it("should handle edge cases with dot notation", () => {
    const obj = {
      "a.b.c": "literal dots",
      a: {
        b: {
          c: "nested path",
        },
      },
    };

    // Should prioritize literal key over dot notation
    expect(getKeyValue(obj, "a.b.c")).toBe("literal dots");

    // Access nested path when literal doesn't exist
    const obj2 = {
      a: {
        b: {
          c: "nested path only",
        },
      },
    };
    expect(getKeyValue(obj2, "a.b.c")).toBe("nested path only");
  });
});
