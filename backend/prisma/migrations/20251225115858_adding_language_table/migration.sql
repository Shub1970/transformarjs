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
CREATE INDEX "language_lists_language_code_language_idx" ON "language_lists"("language_code", "language");
