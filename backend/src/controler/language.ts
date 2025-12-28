import { NextFunction, Request, Response } from "express";
import prisma from "../utils/connect";
import { LanguageList } from "../../prisma/generated/client";
import { LanguageListGetPayload } from "../../prisma/generated/models";

interface CreateLanguageBody {
  language: string;
  language_code: string;
}

export async function createLanguage(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { language, language_code } = req.body as CreateLanguageBody;

    if (!language || !language_code) {
      return res.status(400).json({
        message: "language and language_code are required",
      });
    }

    const createdLanguage = await prisma.languageList.create({
      data: {
        language,
        language_code,
      },
    });

    return res.status(201).json({
      message: "Language created successfully",
      data: createdLanguage,
    });
  } catch (err: any) {
    next(err);
  }
}

export async function getLanguage(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const languages: LanguageList[] = await prisma.languageList.findMany({
      orderBy: { language: "asc" },
    });

    return res.status(200).json({
      data: languages,
      count: languages.length,
    });
  } catch (err) {
    next(err);
  }
}
