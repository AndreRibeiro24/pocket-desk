import { z } from "zod";

export const HealthResponseSchema = z.object({
  status: z.literal("ok"),
  uptime: z.number(),
});
export const LoginRequestSchema = z.object({
  pin: z.string().min(1),
});
export const LoginResponseSchema = z.object({
  token: z.string(),
});
export const ErrorResponseSchema = z.object({
  error: z.string(),
});
export const SystemInfoSchema = z.object({
  hostname: z.string(),
  platform: z.string(),
});

export type SystemInfo = z.infer<typeof SystemInfoSchema>;
export type HealthResponse = z.infer<typeof HealthResponseSchema>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
