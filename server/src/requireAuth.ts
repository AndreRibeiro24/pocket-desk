import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "./env.js";

export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const token = header.slice("Bearer ".length);

  try {
    jwt.verify(token, env.JWT_SECRET, { algorithms: ["HS256"] });
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
}
