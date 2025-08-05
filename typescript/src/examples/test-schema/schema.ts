import { z } from "zod";

export const dataSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1).max(100),
  age: z.number().int().min(0).max(120),
  email: z.string().email(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});
