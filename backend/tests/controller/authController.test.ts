import request from "supertest";
import { generateLoginUser, generateRegisterUser } from "../utils/helper";
import { beforeAll, describe, expect, it } from "@jest/globals";
import { setupWorkingEnvironment } from "../utils/setupWorkingEnvironment";

let app: any;
describe("Authentication Endpoints", () => {
  beforeAll(async () => {
    app = await setupWorkingEnvironment();
  });

  it("should register a new user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send(generateRegisterUser());

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User registered successfully");
  });

  it("should login an existing user", async () => {
    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send(generateLoginUser());

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.token).toBeDefined();
  });
});
