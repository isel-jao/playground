import config from "@/config";
import pino from "pino";
import PinoPretty from "pino-pretty";

export const logger = pino(
  {
    level: config.logLevel,
    transport: {
      target: config.nodeEnv === "production" ? "pino/file" : "pino-pretty",
      options: {
        colorize: config.nodeEnv !== "production",
        translateTime: "SYS:standard",
        ignore: config.nodeEnv === "production" ? "" : "pid,hostname",
      },
    },
  },
  PinoPretty()
);
