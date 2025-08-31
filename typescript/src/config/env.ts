import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  BASE_URL: z.string().default("http://localhost:3000"),
  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace"])
    .default("info"),
  REDIS_URL: z.url().optional(),
});

const { success, data, error } = envSchema.safeParse(process.env);

if (!success) {
  throw new Error(`Invalid environment variables: ${error.message}`);
}

const env = data;

Object.freeze(env);

export { env };
