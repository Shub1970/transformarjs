// Feature controller

import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils/jwt";
import prisma from "../utils/connect";
import { Function } from "../../prisma/generated/enums";
export async function UserFeatureCreate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const cooki = req.cookies;
    const access_token = cooki.access_token;
    const user_type = cooki.user_type;
    if (!access_token) {
      res.status(401).json({
        success: false,
        message: "not authorize",
      });
    }
    const decoded = verifyJWT(access_token);
    const queryFeature: string = req.body.feature;
    const feature: Function = queryFeature.toUpperCase() as Function;
    const response = await prisma.userFeatureUsage.upsert({
      where: {
        userId_feature: {
          userId: decoded.userId as number,
          feature: feature,
        },
      },
      create: {
        userId: decoded.userId,
        feature: feature,
        useage: 1,
      },
      update: {
        useage: { increment: 1 },
      },
    });
    res.status(201).json({
      success: true,
      message: "succefull feature update and created",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `error: ${err}`,
    });
    next(err);
  }
}

export async function GetTotalFeatureUsage(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const cooki = req.cookies;
    const access_token = cooki.access_token;
    const user_type = cooki.user_type;
    if (!access_token) {
      res.status(401).json({
        success: false,
        message: "not authorize",
      });
      return;
    }
    const decoded = verifyJWT(access_token);

    const result = await prisma.userFeatureUsage.aggregate({
      where: {
        userId: decoded.userId as number,
      },
      _sum: {
        useage: true,
      },
    });

    const total = result._sum.useage || 0;

    res.status(200).json({
      success: true,
      total: total,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `error: ${err}`,
    });
    next(err);
  }
}
