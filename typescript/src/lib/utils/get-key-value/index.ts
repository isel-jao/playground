export function getKeyValue(obj: any, key: string): any {
  // Handle non-object inputs
  if (obj === null || obj === undefined || typeof obj !== "object") {
    return undefined;
  }

  // check if obj is a Map
  if (obj instanceof Map && obj.has(key)) {
    return obj.get(key);
  }

  // First, try to access the key directly (handles keys with literal dots)
  if (key in obj) {
    return obj[key];
  }

  // If direct access fails, try dot notation for nested properties
  const keys = key.split(".");
  let current = obj;

  // Traverse the object following the key path
  for (const k of keys) {
    // Check if current is null/undefined or not an object
    if (
      current === null ||
      current === undefined ||
      typeof current !== "object"
    ) {
      return undefined;
    }

    // Handle Map objects
    if (current instanceof Map && current.has(k)) {
      current = current.get(k);
    } else {
      // Handle regular objects
      if (!(k in current)) {
        return undefined;
      }
      current = current[k];
    }
  }

  return current;
}
