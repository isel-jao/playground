import { env } from "./env";

const config = {
  serviceName: "Example App",
  port: env.PORT,
  nodeEnv: env.NODE_ENV,
  baseUrl: env.BASE_URL,
  logLevel: env.LOG_LEVEL,
};

Object.freeze(config);

export default config;
