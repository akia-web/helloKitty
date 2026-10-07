/*
  Warnings:

  - Added the required column `bonus1` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bonus2` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "bonus1" TEXT NOT NULL,
ADD COLUMN     "bonus2" TEXT NOT NULL;
