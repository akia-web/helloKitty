/*
  Warnings:

  - Added the required column `hugeDescription` to the `Fish` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regularDescription` to the `Fish` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tinyDescription` to the `Fish` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weatherReport` to the `Fish` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WeatherReport" AS ENUM ('ALL', 'SUNNY', 'RAIN', 'STARFALL', 'STEAM', 'SNOWFALL', 'FLOURFAL');

-- AlterTable
ALTER TABLE "Fish" ADD COLUMN     "bait1Id" INTEGER,
ADD COLUMN     "bait2Id" INTEGER,
ADD COLUMN     "hugeDescription" TEXT NOT NULL,
ADD COLUMN     "regularDescription" TEXT NOT NULL,
ADD COLUMN     "tinyDescription" TEXT NOT NULL,
ADD COLUMN     "weatherReport" "WeatherReport" NOT NULL;

-- AddForeignKey
ALTER TABLE "Fish" ADD CONSTRAINT "Fish_bait1Id_fkey" FOREIGN KEY ("bait1Id") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fish" ADD CONSTRAINT "Fish_bait2Id_fkey" FOREIGN KEY ("bait2Id") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
