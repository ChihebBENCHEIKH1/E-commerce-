import { Request, Response } from "express";

export interface ITransactionController {
  createPayment(req: Request, res: Response): any;

  webhookHandler(req: Request, res: Response): any;
}
