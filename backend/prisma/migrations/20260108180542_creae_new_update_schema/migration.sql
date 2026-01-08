-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('GUEST', 'AUTHENTICATED');

-- CreateEnum
CREATE TYPE "Function" AS ENUM ('TRANSLATE', 'BACKGROUNDREMOVE', 'VOICECHAT');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "ip_address" TEXT NOT NULL,
    "user_agent" TEXT NOT NULL,
    "google_id" TEXT,
    "profile_picture" TEXT,
    "userType" "UserType" NOT NULL DEFAULT 'GUEST',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "language_lists" (
    "id" SERIAL NOT NULL,
    "language" TEXT NOT NULL,
    "language_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "language_lists_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_google_id_key" ON "users"("google_id");

-- CreateIndex
CREATE INDEX "users_email_google_id_idx" ON "users"("email", "google_id");

-- CreateIndex
CREATE INDEX "features_feature_userId_idx" ON "features"("feature", "userId");

-- CreateIndex
CREATE INDEX "features_userId_idx" ON "features"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "language_lists_language_key" ON "language_lists"("language");

-- CreateIndex
CREATE UNIQUE INDEX "language_lists_language_code_key" ON "language_lists"("language_code");

-- CreateIndex
CREATE INDEX "language_lists_language_code_language_idx" ON "language_lists"("language_code", "language");

-- AddForeignKey
ALTER TABLE "features" ADD CONSTRAINT "features_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
