import express, { Application } from "express";
import type { Request, Response } from "express";
import type { HealthResponse } from "@pocketdesk/shared";
export const app = express();

app.get("/api/health", (req: Request, res: Response<HealthResponse>): void => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
  });
});
