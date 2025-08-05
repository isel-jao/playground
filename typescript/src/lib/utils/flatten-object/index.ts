export function flattenObject(obj: Record<string, unknown>) {
  const result: Record<string, unknown> = {};
  function recurse(current: Record<string, unknown>, property: string) {
    for (const key in current) {
      if (Object.prototype.hasOwnProperty.call(current, key)) {
        const newKey = property ? `${property}.${key}` : key;
        if (typeof current[key] === "object" && current[key] !== null) {
          recurse(current[key] as Record<string, unknown>, newKey);
        } else {
          result[newKey] = current[key];
        }
      }
    }
  }
  recurse(obj, "");
  return result;
}
