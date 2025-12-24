/*
  Warnings:

  - You are about to drop the `guest_users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_authorId_fkey";

-- DropTable
DROP TABLE "guest_users";

-- DropTable
DROP TABLE "posts";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "guest_session" (
    "id" SERIAL NOT NULL,
    "ip_address" TEXT NOT NULL,
    "usage_count" INTEGER NOT NULL DEFAULT 0,
    "sessionToken" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "guest_session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "guest_session_sessionToken_key" ON "guest_session"("sessionToken");

-- CreateIndex
CREATE INDEX "guest_session_ip_address_sessionToken_idx" ON "guest_session"("ip_address", "sessionToken");
