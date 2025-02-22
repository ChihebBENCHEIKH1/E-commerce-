import { Container } from "inversify";
import { TYPES } from "./inversifyConstants";
import { AuthService } from "../service/implementations/AuthService";
import { AuthController } from "../controller/implementations/AuthController";
import { StaticContentRouter } from "../routes/implementations/StaticContentRouter";
import { AuthRouter } from "../routes/implementations/AuthRouter";
import { EmailService } from "../service/implementations/EmailService";
import { IEmailService } from "../service/interfaces/IEmailService";
import { IAuthService } from "../service/interfaces/IAuthService";
import { IRouter } from "../routes/interfaces/IRouter";
import { IAuthController } from "../controller/interfaces/IAuthcontroller";
import { IUserRepository } from "../repository/interfaces/IUserRepository";
import { UserRepository } from "../repository/implementations/UserRepository";
import { ITransactionRepository } from "../repository/interfaces/ITransactionRepository";
import { TransactionRepository } from "../repository/implementations/TransactionRepository";
import { ITransactionService } from "../service/interfaces/ITransactionService";
import { TransactionService } from "../service/implementations/TransactionService";
import { ITransactionController } from "../controller/interfaces/ITransactionController";
import { TransactionController } from "../controller/implementations/TransactionController";
import { TransactionRouter } from "../routes/implementations/TransactionRouter";
import { IInvoiceService } from "../service/interfaces/IInvoiceService";
import { InvoiceService } from "../service/implementations/InvoiceService";

const container = new Container();

// Repositories
container
  .bind<IUserRepository>(TYPES.IUserRepository)
  .to(UserRepository)
  .inSingletonScope();
container
  .bind<ITransactionRepository>(TYPES.ITransactionRepository)
  .to(TransactionRepository)
  .inSingletonScope();

// Services
container
  .bind<IAuthService>(TYPES.IAuthService)
  .to(AuthService)
  .inSingletonScope();
container
  .bind<ITransactionService>(TYPES.ITransactionService)
  .to(TransactionService)
  .inSingletonScope();
container
  .bind<IEmailService>(TYPES.IEmailService)
  .to(EmailService)
  .inTransientScope();
container
  .bind<IInvoiceService>(TYPES.IInvoiceService)
  .to(InvoiceService)
  .inTransientScope();

// Controllers
container
  .bind<IAuthController>(TYPES.IAuthController)
  .to(AuthController)
  .inSingletonScope();
container
  .bind<ITransactionController>(TYPES.ITransactionController)
  .to(TransactionController)
  .inSingletonScope();

// Routers
container
  .bind<IRouter>(TYPES.IRouter)
  .to(AuthRouter)
  .whenTargetNamed("AuthRouter");
container
  .bind<IRouter>(TYPES.IRouter)
  .to(TransactionRouter)
  .whenTargetNamed("TransactionRouter");
container
  .bind<IRouter>(TYPES.IRouter)
  .to(StaticContentRouter)
  .whenTargetNamed("StaticContentRouter");
export { container };
