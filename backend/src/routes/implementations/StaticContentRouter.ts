import express from "express";
import { injectable } from "inversify";
import { countries } from "../../utils/data/countries";
import { IRouter } from "../interfaces/IRouter";

@injectable()
export class StaticContentRouter implements IRouter {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.use("/countries", (req, res) => {
      res.json(countries);
    });
  }
}
