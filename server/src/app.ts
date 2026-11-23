import express from "express";
import type { Request, Response } from "express";
import type { HealthResponse } from "@pocketdesk/shared";
import { authRouter } from "./auth.js";
import { systemRouter } from "./system.js";
import { requireAuth } from "./requireAuth.js";

export const app = express();

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/system", requireAuth, systemRouter);

app.get("/api/health", (req: Request, res: Response<HealthResponse>): void => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
  });
});
