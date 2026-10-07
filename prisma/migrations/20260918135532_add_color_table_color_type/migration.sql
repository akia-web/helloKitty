/*
  Warnings:

  - Added the required column `colorType` to the `FlowerColor` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FlowerColorType" AS ENUM ('BASE', 'TEINTE', 'OMBRE');

-- AlterTable
ALTER TABLE "FlowerColor" ADD COLUMN     "colorType" "FlowerColorType" NOT NULL;
