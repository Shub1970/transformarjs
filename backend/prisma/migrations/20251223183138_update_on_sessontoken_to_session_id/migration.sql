/*
  Warnings:

  - You are about to drop the column `session_token` on the `guest_session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[session_id]` on the table `guest_session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `session_id` to the `guest_session` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "guest_session_ip_address_session_token_idx";

-- DropIndex
DROP INDEX "guest_session_session_token_key";

-- AlterTable
ALTER TABLE "guest_session" DROP COLUMN "session_token",
ADD COLUMN     "session_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "guest_session_session_id_key" ON "guest_session"("session_id");

-- CreateIndex
CREATE INDEX "guest_session_ip_address_session_id_idx" ON "guest_session"("ip_address", "session_id");
