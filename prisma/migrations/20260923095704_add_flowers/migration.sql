/*
  Warnings:

  - You are about to drop the column `color` on the `FlowerColor` table. All the data in the column will be lost.
  - You are about to drop the column `colorType` on the `FlowerColor` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `FlowerColor` table. All the data in the column will be lost.
  - You are about to drop the `_FlowerToFlowerColor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `defaultMotif` to the `Flower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color1Id` to the `FlowerColor` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Motif" AS ENUM ('NONE', 'OMBRE', 'BORD', 'TACHETE', 'ALTERNATIF', 'RAYE', 'FRAGMENTE', 'ANNEAU', 'CONFETTI', 'GEL', 'FUSION', 'CRISTAL', 'COSMIQUE', 'IRISE', 'LUEUR', 'PAILLETTES', 'RAYON_DE_SOLEIL');

-- DropForeignKey
ALTER TABLE "_FlowerToFlowerColor" DROP CONSTRAINT "_FlowerToFlowerColor_A_fkey";

-- DropForeignKey
ALTER TABLE "_FlowerToFlowerColor" DROP CONSTRAINT "_FlowerToFlowerColor_B_fkey";

-- DropIndex
DROP INDEX "FlowerColor_name_key";

-- AlterTable
ALTER TABLE "Flower" ADD COLUMN     "defaultMotif" "Motif" NOT NULL;

-- AlterTable
ALTER TABLE "FlowerColor" DROP COLUMN "color",
DROP COLUMN "colorType",
DROP COLUMN "name",
ADD COLUMN     "color1Id" INTEGER NOT NULL,
ADD COLUMN     "color2Id" INTEGER,
ADD COLUMN     "motif" "Motif" NOT NULL DEFAULT 'NONE';

-- DropTable
DROP TABLE "_FlowerToFlowerColor";

-- CreateTable
CREATE TABLE "DefaultColor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "colorType" "FlowerColorType" NOT NULL,

    CONSTRAINT "DefaultColor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlowerUser" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "flowerId" INTEGER NOT NULL,

    CONSTRAINT "FlowerUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DefaultColorToFlower" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DefaultColorToFlower_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_FlowerColorToFlowerUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_FlowerColorToFlowerUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "DefaultColor_name_key" ON "DefaultColor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FlowerUser_userId_flowerId_key" ON "FlowerUser"("userId", "flowerId");

-- CreateIndex
CREATE INDEX "_DefaultColorToFlower_B_index" ON "_DefaultColorToFlower"("B");

-- CreateIndex
CREATE INDEX "_FlowerColorToFlowerUser_B_index" ON "_FlowerColorToFlowerUser"("B");

-- AddForeignKey
ALTER TABLE "FlowerColor" ADD CONSTRAINT "FlowerColor_color1Id_fkey" FOREIGN KEY ("color1Id") REFERENCES "DefaultColor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlowerColor" ADD CONSTRAINT "FlowerColor_color2Id_fkey" FOREIGN KEY ("color2Id") REFERENCES "DefaultColor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlowerUser" ADD CONSTRAINT "FlowerUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlowerUser" ADD CONSTRAINT "FlowerUser_flowerId_fkey" FOREIGN KEY ("flowerId") REFERENCES "Flower"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DefaultColorToFlower" ADD CONSTRAINT "_DefaultColorToFlower_A_fkey" FOREIGN KEY ("A") REFERENCES "DefaultColor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DefaultColorToFlower" ADD CONSTRAINT "_DefaultColorToFlower_B_fkey" FOREIGN KEY ("B") REFERENCES "Flower"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FlowerColorToFlowerUser" ADD CONSTRAINT "_FlowerColorToFlowerUser_A_fkey" FOREIGN KEY ("A") REFERENCES "FlowerColor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FlowerColorToFlowerUser" ADD CONSTRAINT "_FlowerColorToFlowerUser_B_fkey" FOREIGN KEY ("B") REFERENCES "FlowerUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
