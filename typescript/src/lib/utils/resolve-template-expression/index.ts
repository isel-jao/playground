import { getKeyValue } from "@/lib/utils/get-key-value";

type Context = Record<string, unknown> | Map<string, unknown>;

export function resolveTemplateExpressions<T extends Record<string, unknown>>(
  obj: T,
  contexts: Record<string, Context>
): T {
  const result: any = Array.isArray(obj) ? [] : {};

  Object.entries(obj).forEach(([key, value]) => {
    // If the value is a string and contains a template expression, resolve it
    const expressionRegex = /\{\{\s*([^}]+\s*)\}\}/g;
    if (typeof value === "string" && expressionRegex.test(value)) {
      Object.defineProperty(result, key, {
        get: () => {
          return value.replace(expressionRegex, (match, expression) => {
            console.log("Matched:", { expression });
            const resolved = getKeyValue(contexts, expression.trim());
            return resolved ?? match;
          });
        },
      });
    } else if (typeof value === "string") {
      console.log("Not resolving:", value);
      result[key] = value;
    } else if (typeof value === "object" && value !== null) {
      // Recursively resolve nested objects
      result[key] = resolveTemplateExpressions(
        value as Record<string, unknown>,
        contexts
      );
    } else {
      result[key] = value;
    }
  });

  return result as T;
}
