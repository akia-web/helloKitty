-- CreateEnum
CREATE TYPE "ObtainWith" AS ENUM ('BASE_GAME', 'WHEATFLOUR_WONDERLAND', 'CITY_TOWN');

-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "ObtainWith" "ObtainWith" NOT NULL DEFAULT 'BASE_GAME';
