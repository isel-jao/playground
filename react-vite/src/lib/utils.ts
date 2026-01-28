import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ensureUniqueName(
  name: string,
  existingNames: Set<string> | string[],
): string {
  const set =
    existingNames instanceof Set ? existingNames : new Set(existingNames);
  if (!set.has(name)) {
    return name;
  }

  const match = name.match(/^(.*?)(\d+)$/);
  const baseName = match ? match[1] : name;
  let counter = match ? parseInt(match[2], 10) + 1 : 1;

  let candidateName = baseName + counter;
  while (set.has(candidateName)) {
    counter++;
    candidateName = baseName + counter;
  }

  return candidateName;
}

export const isObject = (val: unknown): boolean =>
  val !== null && typeof val === "object" && !Array.isArray(val);
export const isArray = (val: unknown): boolean => Array.isArray(val);
