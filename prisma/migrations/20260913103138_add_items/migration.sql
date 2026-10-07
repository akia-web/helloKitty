/*
  Warnings:

  - You are about to drop the column `favoriteGift` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `receivedGift` on the `Character` table. All the data in the column will be lost.
  - Added the required column `favoriteGiftId` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receivedGiftId` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "favoriteGift",
DROP COLUMN "receivedGift",
ADD COLUMN     "favoriteGiftId" INTEGER NOT NULL,
ADD COLUMN     "receivedGiftId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_favoriteGiftId_fkey" FOREIGN KEY ("favoriteGiftId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_receivedGiftId_fkey" FOREIGN KEY ("receivedGiftId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
