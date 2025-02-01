import request from "supertest";
import { generateUser } from "../utils/helper";
import { UserDTO } from "../../src/dto/UserDTO";
import { setupWorkingEnvironment } from "../utils/setupWorkingEnvironment";

let user: UserDTO;
let app: any;
describe("Authentication Endpoints", () => {
  beforeAll(async () => {
    app = await setupWorkingEnvironment();
    user = generateUser();
  });

  it("should register a new user", async () => {
    const response = await request(app).post("/api/auth/register").send(user);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User registered successfully");
  });

  it("should login an existing user", async () => {
    const loginResponse = await request(app).post("/api/auth/login").send({
      username: user.username,
      password: user.password,
    });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.token).toBeDefined();
  });
});
