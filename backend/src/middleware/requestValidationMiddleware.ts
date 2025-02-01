import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function requestValidationMiddleware<T>(
  type: any
): (req: Request, res: Response, next: NextFunction) => void {
  return (req, res, next) => {
    const dtoObject = plainToInstance(type, req.body);
    validate(dtoObject).then((errors) => {
      if (errors.length > 0) {
        const messages = errors
          .map((error) => Object.values(error.constraints || {}))
          .join(", ");
        res.status(400).json({ error: messages });
      } else {
        req.body = dtoObject;
        next();
      }
    });
  };
}
