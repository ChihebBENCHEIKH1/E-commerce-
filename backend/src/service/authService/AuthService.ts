import { inject, injectable } from "inversify";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { IUserRepository } from "../../repository/user/IUserRepository";
import { TYPES } from "../../config/inversifyConstants";
import { getEnvVar } from "../../utils/helper";

@injectable()
export class AuthService {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository
  ) {}

  async register(username: string, password: string): Promise<void> {
    const existingUser = await this.userRepository.findUserByUsername(username);
    if (existingUser) {
      throw new Error("Username already exists");
    }

    await this.userRepository.createUser({ username, password });
  }

  async login(username: string, password: string): Promise<string> {
    const user = await this.userRepository.findUserByUsername(username);

    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { userId: user._id },
      String(getEnvVar("JWT_SECRET")),
      {
        expiresIn: Number(getEnvVar("JWT_EXPIRES_IN")),
      }
    );

    return token;
  }
}
