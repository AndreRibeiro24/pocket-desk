import { Router } from "express";
import type { Request, Response } from "express";
import os from "node:os";
import type { SystemInfo } from "@pocketdesk/shared";
import { requireAuth } from "./requireAuth.js";

export const systemRouter = Router();

systemRouter.get(
  "/info",
  requireAuth,
  (_req: Request, res: Response<SystemInfo>) => {
    res.status(200).json({
      hostname: os.hostname(),
      platform: os.platform(),
    });
  },
);
