import { Container } from "inversify";
import { TYPES } from "./inversifyConstants";
import { IUserRepository } from "../repository/user/IUserRepository";
import { UserRepository } from "../repository/user/UserRepository";
import { AuthService } from "../service/authService/AuthService";
import { AuthController } from "../controller/AuthController";
import { AuthRoutes } from "../routes/AuthRoutes";

const container = new Container();

container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
container.bind<AuthService>(TYPES.AuthService).to(AuthService);
container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container.bind<AuthRoutes>(TYPES.AuthRoutes).to(AuthRoutes);

export { container };
