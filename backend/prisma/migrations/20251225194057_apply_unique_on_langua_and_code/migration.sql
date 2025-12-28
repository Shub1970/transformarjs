/*
  Warnings:

  - A unique constraint covering the columns `[language]` on the table `language_lists` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[language_code]` on the table `language_lists` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "language_lists_language_key" ON "language_lists"("language");

-- CreateIndex
CREATE UNIQUE INDEX "language_lists_language_code_key" ON "language_lists"("language_code");
