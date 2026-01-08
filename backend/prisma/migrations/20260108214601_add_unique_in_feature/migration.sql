/*
  Warnings:

  - A unique constraint covering the columns `[feature,userId]` on the table `features` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "name" SET DEFAULT 'Guest';

-- CreateIndex
CREATE UNIQUE INDEX "features_feature_userId_key" ON "features"("feature", "userId");
