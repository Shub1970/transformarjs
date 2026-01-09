/*
  Warnings:

  - Changed the type of `feature` on the `features` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserFunction" AS ENUM ('TRANSLATE', 'BACKGROUNDREMOVE', 'VOICECHAT');

-- AlterTable
ALTER TABLE "features" DROP COLUMN "feature",
ADD COLUMN     "feature" "UserFunction" NOT NULL;

-- DropEnum
DROP TYPE "Function";

-- CreateIndex
CREATE INDEX "features_feature_userId_idx" ON "features"("feature", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "features_feature_userId_key" ON "features"("feature", "userId");
