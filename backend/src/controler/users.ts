import express from "express";
import { Request, Response } from "express";
import type { GuestUserCreateInput } from "../../prisma/generated/models";
import { Prisma, PrismaClient } from "../../prisma/generated/client";
import prisma from "../utils/connect";

export async function createGuestUser(req: Request, res: Response) {
  const guestIP = req?.ip || "";
  const time = new Date();
  const expiresAt = new Date(time);
  expiresAt.setDate(expiresAt.getDate() + 5);
  let guestUser: GuestUserCreateInput;
  guestUser = {
    ipAddress: guestIP,
    expiresAt: expiresAt,
  };
  const response = await prisma.guestUser.create({
    data: guestUser,
  });
}
