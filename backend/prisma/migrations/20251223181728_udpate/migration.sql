/*
  Warnings:

  - You are about to drop the column `sessionToken` on the `guest_session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[session_token]` on the table `guest_session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `session_token` to the `guest_session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_agent` to the `guest_session` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('GUEST', 'AUTHENTICATED');

-- DropIndex
DROP INDEX "guest_session_ip_address_sessionToken_idx";

-- DropIndex
DROP INDEX "guest_session_sessionToken_key";

-- AlterTable
ALTER TABLE "guest_session" DROP COLUMN "sessionToken",
ADD COLUMN     "session_token" TEXT NOT NULL,
ADD COLUMN     "userType" "UserType" NOT NULL DEFAULT 'GUEST',
ADD COLUMN     "user_agent" TEXT NOT NULL,
ALTER COLUMN "usage_count" DROP NOT NULL,
ALTER COLUMN "usage_count" SET DEFAULT 5;

-- CreateIndex
CREATE UNIQUE INDEX "guest_session_session_token_key" ON "guest_session"("session_token");

-- CreateIndex
CREATE INDEX "guest_session_ip_address_session_token_idx" ON "guest_session"("ip_address", "session_token");
