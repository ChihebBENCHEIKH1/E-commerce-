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
    /**
     * @swagger
     * /api/countries:
     *   get:
     *     summary: Get a list of countries
     *     tags: [Static Content]
     *     responses:
     *       200:
     *         description: List of countries
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: string
     *                 example: "United States"
     */
    this.router.use("/countries", (req, res) => {
      res.json(countries);
    });

    /**
     * @swagger
     * /api/motorcycles:
     *   get:
     *     summary: Get a paginated list of motorcycles
     *     tags: [Static Content]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: query
     *         name: page
     *         schema:
     *           type: integer
     *         required: true
     *         description: Page number
     *       - in: query
     *         name: limit
     *         schema:
     *           type: integer
     *         required: true
     *         description: Number of items per page
     *     responses:
     *       200:
     *         description: Paginated list of motorcycles
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 data:
     *                   type: array
     *                   items:
     *                     type: string
     *                     example: "Harley Davidson"
     *                 total:
     *                   type: integer
     *                   example: 100
     *                 page:
     *                   type: integer
     *                   example: 1
     *                 limit:
     *                   type: integer
     *                   example: 10
     *       400:
     *         description: Invalid page or limit
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */
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
