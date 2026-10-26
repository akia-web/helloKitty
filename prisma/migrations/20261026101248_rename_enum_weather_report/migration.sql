/*
  Warnings:

  - The values [FLOURFAL] on the enum `WeatherReport` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "WeatherReport_new" AS ENUM ('ALL', 'SUNNY', 'RAIN', 'STARFALL', 'STEAM', 'SNOWFALL', 'FLOURFALL', 'MORNING', 'DAYTIME', 'EVENING', 'NIGHT');
ALTER TABLE "Fish" ALTER COLUMN "weatherReport" TYPE "WeatherReport_new"[] USING ("weatherReport"::text::"WeatherReport_new"[]);
ALTER TYPE "WeatherReport" RENAME TO "WeatherReport_old";
ALTER TYPE "WeatherReport_new" RENAME TO "WeatherReport";
DROP TYPE "public"."WeatherReport_old";
COMMIT;
