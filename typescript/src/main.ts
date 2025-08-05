import { flattenObject } from "@/lib/utils/flatten-object";
import { logger } from "./lib/logger";

const obj = { a: 1, b: { c: 2, d: 3 }, e: 4 };
const flattened = flattenObject(obj);
logger.info(flattened);
