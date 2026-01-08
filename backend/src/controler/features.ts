// Feature controller

import { Request, Response } from "express";

export async function UserFeatureCreate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const cooki = req.cookies;
    const access_token = cooki.access_token;
    if (!access_token) {
      res.status(401).json({});
    }
  } catch (err) {
    next(err);
  }
}
