import { describe, it, expect } from "vitest";
import { resolveTemplateExpressions } from ".";

describe("resolveTemplateExpression", () => {
  it("should return the same object if there are no template expressions", () => {
    const obj = { a: 1, b: "test", c: true };
    const context = {};
    const result = resolveTemplateExpressions(obj, context);
    expect(result).toEqual(obj);
  });

  it("should resolve simple template expressions", () => {
    const obj = { greeting: "Hello, {{ user.name }}!" };
    const context = { user: { name: "Alice" } };
    const result = resolveTemplateExpressions(obj, context);
    expect(result.greeting).toBe("Hello, Alice!");
  });
  it("should resolve multiple template expressions in a single string", () => {
    const obj = { message: "{{ user.greeting }}, {{ user.name }}!" };
    const context = { user: { greeting: "Hi", name: "Bob" } };
    const result = resolveTemplateExpressions(obj, context);
    expect(result.message).toBe("Hi, Bob!");
  });

  it("should return the same string if there are no template expressions", () => {
    const obj = { farewell: "Goodbye, {{ user.name }}!" };
    const context = {};
    const result = resolveTemplateExpressions(obj, context);
    expect(result.farewell).toBe("Goodbye, {{ user.name }}!");
  });

  it("should handle nested objects with template expressions", () => {
    const obj = {
      user: {
        name: "{{ profile.firstName }} {{ profile.lastName }}",
        age: "{{ profile.age }}",
      },
    };
    const context = {
      profile: { firstName: "Charlie", lastName: "Doe", age: 30 },
    };
    const result = resolveTemplateExpressions(obj, context);
    expect(result.user.name).toBe("Charlie Doe");
    expect(result.user.age).toBe("30");
  });

  it("should handle arrays with template expressions", () => {
    const obj = [
      "{{ user.name }}",
      "{{ user.email }}",
      "Static string",
      { nested: "{{ user.role }}" }
    ] as any;
    const context = {
      user: { name: "Alice", email: "alice@example.com", role: "admin" }
    };
    const result = resolveTemplateExpressions(obj, context);
    expect(result[0]).toBe("Alice");
    expect(result[1]).toBe("alice@example.com");
    expect(result[2]).toBe("Static string");
    expect((result[3] as any).nested).toBe("admin");
  });

  it("should handle deeply nested objects and arrays", () => {
    const obj = {
      config: {
        database: {
          host: "{{ db.host }}",
          port: "{{ db.port }}",
          credentials: {
            username: "{{ db.user }}",
            password: "{{ db.pass }}"
          }
        },
        features: [
          { name: "auth", enabled: "{{ features.auth }}" },
          { name: "logging", enabled: "{{ features.logging }}" }
        ]
      }
    };
    const context = {
      db: { host: "localhost", port: 5432, user: "admin", pass: "secret" },
      features: { auth: true, logging: false }
    };
    const result = resolveTemplateExpressions(obj, context);
    expect(result.config.database.host).toBe("localhost");
    expect(result.config.database.port).toBe("5432");
    expect(result.config.database.credentials.username).toBe("admin");
    expect(result.config.database.credentials.password).toBe("secret");
    expect(result.config.features[0].enabled).toBe("true");
    expect(result.config.features[1].enabled).toBe("false");
  });

  it("should handle template expressions with whitespace variations", () => {
    const obj = {
      a: "{{user.name}}",
      b: "{{ user.name }}",
      c: "{{  user.name  }}",
      d: "{{ user.name}}",
      e: "{{user.name }}"
    };
    const context = { user: { name: "Bob" } };
    const result = resolveTemplateExpressions(obj, context);
    expect(result.a).toBe("Bob");
    expect(result.b).toBe("Bob");
    expect(result.c).toBe("Bob");
    expect(result.d).toBe("Bob");
    expect(result.e).toBe("Bob");
  });

  it("should handle mixed content with template expressions", () => {
    const obj = {
      message: "Hello {{ user.name }}, you have {{ notifications.count }} new messages!",
      url: "https://{{ domain.value }}/user/{{ user.id }}",
      complex: "Start {{ data.start }} - End {{ data.end }} ({{ data.duration }}ms)"
    };
    const context = {
      user: { name: "Alice", id: 123 },
      notifications: { count: 5 },
      domain: { value: "example.com" },
      data: { start: "10:00", end: "11:30", duration: 5400000 }
    };
    const result = resolveTemplateExpressions(obj, context);
    expect(result.message).toBe("Hello Alice, you have 5 new messages!");
    expect(result.url).toBe("https://example.com/user/123");
    expect(result.complex).toBe("Start 10:00 - End 11:30 (5400000ms)");
  });

  it("should preserve non-string values", () => {
    const obj = {
      number: 42,
      boolean: true,
      nullValue: null,
      undefinedValue: undefined,
      array: [1, 2, 3],
      object: { key: "value" },
      template: "{{ user.name }}"
    };
    const context = { user: { name: "Alice" } };
    const result = resolveTemplateExpressions(obj, context);
    expect(result.number).toBe(42);
    expect(result.boolean).toBe(true);
    expect(result.nullValue).toBe(null);
    expect(result.undefinedValue).toBe(undefined);
    expect(result.array).toEqual([1, 2, 3]);
    expect(result.object).toEqual({ key: "value" });
    expect(result.template).toBe("Alice");
  });

  it("should handle missing context keys gracefully", () => {
    const obj = {
      existing: "{{ user.name }}",
      missing: "{{ user.nonexistent }}",
      partial: "Hello {{ user.name }}, your {{ user.missing }} is ready!",
      nested: "{{ deeply.nested.missing.key }}"
    };
    const context = { user: { name: "Alice" } };
    const result = resolveTemplateExpressions(obj, context);
    expect(result.existing).toBe("Alice");
    expect(result.missing).toBe("{{ user.nonexistent }}");
    expect(result.partial).toBe("Hello Alice, your {{ user.missing }} is ready!");
    expect(result.nested).toBe("{{ deeply.nested.missing.key }}");
  });

  it("should handle empty and edge case contexts", () => {
    const obj = {
      empty: "{{ }}",
      spaces: "{{   }}",
      single: "{{ a.value }}",
      dot: "{{ . }}",
      doubleDot: "{{ .. }}"
    };
    const context = { a: { value: "value" } };
    const result = resolveTemplateExpressions(obj, context);
    expect(result.empty).toBe("{{ }}");
    expect(result.spaces).toBe("{{   }}");
    expect(result.single).toBe("value");
    expect(result.dot).toBe("{{ . }}");
    expect(result.doubleDot).toBe("{{ .. }}");
  });

  it("should handle special characters in context values", () => {
    const obj = {
      special: "{{ user.special }}",
      unicode: "{{ user.unicode }}",
      json: "{{ user.json }}"
    };
    const context = {
      user: {
        special: "!@#$%^&*(){}[]|\\:;\"'<>?,./",
        unicode: "🚀 Hello 世界 🌍",
        json: '{"key": "value", "nested": {"array": [1,2,3]}}'
      }
    };
    const result = resolveTemplateExpressions(obj, context);
    expect(result.special).toBe("!@#$%^&*(){}[]|\\:;\"'<>?,./");
    expect(result.unicode).toBe("🚀 Hello 世界 🌍");
    expect(result.json).toBe('{"key": "value", "nested": {"array": [1,2,3]}}');
  });

  it("should handle lazy evaluation with getters", () => {
    let accessCount = 0;
    const obj = { message: "{{ user.name }}" };
    const context = {
      user: {
        get name() {
          accessCount++;
          return "Alice";
        }
      }
    };
    const result = resolveTemplateExpressions(obj, context);
    
    // Should not access the getter until the property is accessed
    expect(accessCount).toBe(0);
    
    // Access the property multiple times
    expect(result.message).toBe("Alice");
    expect(result.message).toBe("Alice");
    expect(result.message).toBe("Alice");
    
    // Should access the getter each time due to lazy evaluation
    expect(accessCount).toBe(3);
  });

  it("should handle circular references in context", () => {
    const circular: any = { name: "Alice" };
    circular.self = circular;
    
    const obj = {
      name: "{{ user.name }}",
      selfName: "{{ user.self.name }}"
    };
    const context = { user: circular };
    const result = resolveTemplateExpressions(obj, context);
    
    expect(result.name).toBe("Alice");
    expect(result.selfName).toBe("Alice");
  });

  it("should handle complex nested template expressions", () => {
    const obj = {
      level1: {
        level2: {
          level3: {
            message: "{{ deep.very.nested.value }}",
            array: [
              "{{ items.0 }}",
              "{{ items.1 }}",
              { nested: "{{ items.2.name }}" }
            ]
          }
        }
      }
    };
    const context = {
      deep: { very: { nested: { value: "Found it!" } } },
      items: { "0": "first", "1": "second", "2": { name: "third" } }
    };
    const result = resolveTemplateExpressions(obj, context);
    
    expect(result.level1.level2.level3.message).toBe("Found it!");
    expect(result.level1.level2.level3.array[0]).toBe("first");
    expect(result.level1.level2.level3.array[1]).toBe("second");
    expect((result.level1.level2.level3.array[2] as any).nested).toBe("third");
  });

  it("should handle template expressions with array indices", () => {
    const obj = {
      first: "{{ users.0.name }}",
      second: "{{ users.1.email }}",
      nested: "{{ config.servers.0.host }}:{{ config.servers.0.port }}"
    };
    const context = {
      users: {
        "0": { name: "Alice", email: "alice@example.com" },
        "1": { name: "Bob", email: "bob@example.com" }
      },
      config: {
        servers: {
          "0": { host: "server1.com", port: 8080 },
          "1": { host: "server2.com", port: 8081 }
        }
      }
    };
    const result = resolveTemplateExpressions(obj, context);
    
    expect(result.first).toBe("Alice");
    expect(result.second).toBe("bob@example.com");
    expect(result.nested).toBe("server1.com:8080");
  });
});
