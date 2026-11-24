import { Router } from "express";
import type { Request, Response } from "express";
import { createHash, timingSafeEqual } from "node:crypto";
import jwt from "jsonwebtoken";
import { LoginRequestSchema } from "@pocketdesk/shared";
import type { LoginResponse, ErrorResponse } from "@pocketdesk/shared";
import { env } from "./env.js";
import rateLimit from "express-rate-limit";

export const authRouter = Router();
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many attempts, try again later" },
});
function sha256(value: string): Buffer {
  return createHash("sha256").update(value).digest();
}

function safeEqual(a: string, b: string): boolean {
  return timingSafeEqual(sha256(a), sha256(b));
}

authRouter.post(
  "/login",
  loginLimiter,
  (req: Request, res: Response<LoginResponse | ErrorResponse>) => {
    const result = LoginRequestSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ error: "Invalid request" });
      return;
    }
    if (!safeEqual(result.data.pin, env.PIN)) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    const token = jwt.sign({}, env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token });
  },
);
