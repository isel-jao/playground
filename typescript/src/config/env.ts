import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  BASE_URL: z.url().default("http://localhost:3000"),
});

const { success, data, error } = envSchema.safeParse(process.env);

if (!success) {
  throw new Error(`Invalid environment variables: ${error.message}`);
}

const env = data;

Object.freeze(env);

export { env };
