/*
  Warnings:

  - You are about to drop the `features` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `guest_session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `language_lists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "features" DROP CONSTRAINT "features_userId_fkey";

-- DropTable
DROP TABLE "features";

-- DropTable
DROP TABLE "guest_session";

-- DropTable
DROP TABLE "language_lists";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "Function";

-- DropEnum
DROP TYPE "UserType";
