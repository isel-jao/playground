import { env } from "./env";

const config = {
  port: env.PORT,
  nodeEnv: env.NODE_ENV,
  baseUrl: env.BASE_URL,
};

Object.freeze(config);

export default config;
