// Feature controller

import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils/jwt";
import prisma from "../utils/connect";
import { UserFunction } from "../../prisma/generated/enums";
const FeatureMap = {
  TRANSLATE: UserFunction.TRANSLATE,
  BACKGROUNDREMOVE: UserFunction.BACKGROUNDREMOVE,
  VOICECHAT: UserFunction.VOICECHAT,
} as const;

function parseFeature(value: unknown): UserFunction {
  if (typeof value !== "string") {
    throw new Error("feature must be a string");
  }

  const feature = FeatureMap[value.toUpperCase() as keyof typeof FeatureMap];
  console.log("feature parse", feature);
  if (!feature) {
    throw new Error(`Invalid feature: ${value}`);
  }

  return feature;
}

export async function UserFeatureCreate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const cooki = req.cookies;
    const access_token = cooki.access_token;
    if (!access_token) {
      return res.status(401).json({
        status: "failed",
        message: "not authenticated",
      });
    }
    const decode = verifyJWT(access_token);
    const feature = req.body.feature;
    const upperFeature = parseFeature(feature);

    await prisma.userFeatureUsage.upsert({
      where: {
        feature_userId: {
          userId: decode.userId,
          feature: upperFeature,
        },
      },
      create: {
        userId: decode.userId,
        feature: upperFeature,
        useage: 1,
      },
      update: {
        useage: { increment: 1 },
      },
    });

    res.status(201).json({ success: true });
  } catch (err) {
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
        message: "",
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
