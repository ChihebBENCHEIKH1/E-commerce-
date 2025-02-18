import express from "express";
import { injectable } from "inversify";
import { countries } from "../../utils/data/countries";
import { IRouter } from "../interfaces/IRouter";
import { motorcycles } from "../../utils/data/motorcycles";
import { authMiddleware } from "../../middleware/authMiddleware";

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

    this.router.use("/motorcycles", authMiddleware, (req, res) => {
      const page = parseInt(req.query.page as string);
      const limit = parseInt(req.query.limit as string);
      if (!page || !limit) {
        res.status(400).json({ error: "Invalid page or limit" });
        return;
      }
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const paginatedMotorcycles = motorcycles.slice(startIndex, endIndex);

      res.json({
        data: paginatedMotorcycles,
        total: motorcycles.length,
        page,
        limit,
      });
    });
  }
}
