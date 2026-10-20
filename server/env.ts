import { z } from "zod";

const EnvSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
});

const result = EnvSchema.safeParse(process.env);

if (!result.success) {
  console.error("Invalid environment variables:", result.error.issues);
  process.exit(1);
}

export const env = result.data;
