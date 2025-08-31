import { logger } from "@/lib/logger";
import { createCache } from "cache-manager";
import { createKeyv, Keyv } from "cacheable";
import { createKeyv as createKeyvRedis } from "@keyv/redis";
import config from "@/config";

const store: Keyv[] = [];

const memoryStore = createKeyv(config.memoryCache);

if (config.redisUrl) {
  const redisStore = createKeyvRedis(config.redisUrl);
  store.push(redisStore);
  logger.info("Redis cache store enabled");
}

export const cache = createCache({
  stores: [memoryStore, ...store],
});
