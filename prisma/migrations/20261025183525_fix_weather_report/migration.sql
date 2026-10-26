/*
  Warnings:

  - You are about to drop the column `isDayTime` on the `Fish` table. All the data in the column will be lost.
  - You are about to drop the column `isEvening` on the `Fish` table. All the data in the column will be lost.
  - You are about to drop the column `isMorning` on the `Fish` table. All the data in the column will be lost.
  - You are about to drop the column `isNight` on the `Fish` table. All the data in the column will be lost.
  - You are about to drop the column `weatherReport` on the `Fish` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Fish" DROP COLUMN "isDayTime",
DROP COLUMN "isEvening",
DROP COLUMN "isMorning",
DROP COLUMN "isNight",
DROP COLUMN "weatherReport",
ADD COLUMN     "weather" "WeatherReport"[];
