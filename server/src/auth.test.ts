import { describe, it, expect } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import { LoginResponseSchema, SystemInfoSchema } from "@pocketdesk/shared";
import { app } from "./app.js";

const PIN = "test-pin-123456";
const JWT_SECRET = "test-secret-0123456789abcdef0123456789abcdef";

describe("login", () => {
  it("returns a valid token for a valid PIN", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ pin: PIN });

    expect(response.status).toBe(200);
    expect(LoginResponseSchema.safeParse(response.body).success).toBe(true);
  });

  it("returns 401 for a wrong PIN", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ pin: "wrong-pin" });

    expect(response.status).toBe(401);
  });

  it("returns 400 for a malformed body", async () => {
    const response = await request(app).post("/api/auth/login").send({});

    expect(response.status).toBe(400);
  });
});

describe("protected route", () => {
  it("returns 401 without a token", async () => {
    const response = await request(app).get("/api/system/info");

    expect(response.status).toBe(401);
  });

  it("returns 200 and valid data with a valid token", async () => {
    const token = jwt.sign({}, JWT_SECRET, { expiresIn: "1h" });
    const response = await request(app)
      .get("/api/system/info")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(SystemInfoSchema.safeParse(response.body).success).toBe(true);
  });

  it("returns 401 for tampered token", async () => {
    const validToken = jwt.sign({}, JWT_SECRET);
    //define control for the untouched token that is accepted.
    const control = await request(app)
      .get("/api/system/info")
      .set("Authorization", `Bearer ${validToken}`);

    expect(control.status).toBe(200);

    const [header, payload, signature] = validToken.split(".");
    const replacement = signature[0] === "a" ? "b" : "a";
    const tamperedToken = [
      header,
      payload,
      replacement + signature.slice(1),
    ].join(".");

    const response = await request(app)
      .get("/api/system/info")
      .set("Authorization", `Bearer ${tamperedToken}`);

    expect(response.status).toBe(401);
  });

  it("returns 401 for an expired token", async () => {
    const token = jwt.sign({}, JWT_SECRET, { expiresIn: -10 });
    const response = await request(app)
      .get("/api/system/info")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(401);
  });
});
