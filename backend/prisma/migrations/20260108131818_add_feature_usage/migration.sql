-- CreateEnum
CREATE TYPE "Function" AS ENUM ('TRANSLATE', 'BACKGROUNDREMOVE', 'VOICECHAT');

-- CreateTable
CREATE TABLE "features" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "feature" "Function" NOT NULL,
    "useage" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "features_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "features_feature_userId_idx" ON "features"("feature", "userId");

-- CreateIndex
CREATE INDEX "features_userId_idx" ON "features"("userId");

-- AddForeignKey
ALTER TABLE "features" ADD CONSTRAINT "features_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
