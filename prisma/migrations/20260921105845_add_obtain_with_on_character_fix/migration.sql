/*
  Warnings:

  - You are about to drop the column `ObtainWith` on the `Character` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "ObtainWith",
ADD COLUMN     "obtainWith" "ObtainWith" NOT NULL DEFAULT 'BASE_GAME';
