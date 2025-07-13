import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export function validate(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
    } else {
      next();
    }
  };
}
