import config from "@/config";
import { flattenObject } from "@/lib/utils/flatten-object";

const obj = { a: 1, b: { c: 2, d: 3 }, e: 4 };
const flattened = flattenObject(obj);
console.log(flattened);

console.log(config);
