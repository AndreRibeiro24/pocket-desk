import { HealthResponseSchema } from "@pocketdesk/shared";
import { app } from "./app.js";
import request from "supertest";
import { describe, it, expect } from "vitest";

describe("API Endpoints Tests", () => {
  it("Return HTTP 200 and validate body in /api/health", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);

    const parseResult = HealthResponseSchema.safeParse(response.body);

    expect(parseResult.success).toBe(true);
  });
  it("return HTTP 404 for inexistent route", async () => {
    const response = await request(app).get("/api/nothing");

    expect(response.status).toBe(404);
  });
});
