import { env } from "./env";

const config = {
  serviceName: "Example App",
  port: env.PORT,
  nodeEnv: env.NODE_ENV,
  baseUrl: env.BASE_URL,
  logLevel: env.LOG_LEVEL,
  redisUrl: env.REDIS_URL,
  memoryCache: {
    ttl: 3600_000,
    lruSize: 100,
  },
};

Object.freeze(config);

export default config;
