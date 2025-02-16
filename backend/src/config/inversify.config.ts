import { Container } from "inversify";
import { TYPES } from "./inversifyConstants";
import { IUserRepository } from "../repository/user/interfaces/IUserRepository";
import { UserRepository } from "../repository/user/implementations/UserRepository";
import { AuthService } from "../service/implementations/AuthService";
import { AuthController } from "../controller/implementations/AuthController";
import { StaticContentRouter } from "../routes/implementations/StaticContentRouter";
import { AuthRouter } from "../routes/implementations/AuthRouter";
import { EmailService } from "../service/implementations/EmailService";
import { IEmailService } from "../service/interfaces/IEmailService";
import { IAuthService } from "../service/interfaces/IAuthService";
import { IRouter } from "../routes/interfaces/IRouter";
import { IAuthController } from "../controller/interfaces/IAuthcontroller";

const container = new Container();

// Repositories
container
  .bind<IUserRepository>(TYPES.IUserRepository)
  .to(UserRepository)
  .inSingletonScope();

// Services
container
  .bind<IAuthService>(TYPES.IAuthService)
  .to(AuthService)
  .inSingletonScope();
container
  .bind<IEmailService>(TYPES.IEmailService)
  .to(EmailService)
  .inTransientScope();

// Controllers
container
  .bind<IAuthController>(TYPES.IAuthController)
  .to(AuthController)
  .inSingletonScope();

// Routers
container
  .bind<IRouter>(TYPES.IRouter)
  .to(AuthRouter)
  .whenTargetNamed("AuthRouter");
container
  .bind<IRouter>(TYPES.IRouter)
  .to(StaticContentRouter)
  .whenTargetNamed("StaticContentRouter");
export { container };
