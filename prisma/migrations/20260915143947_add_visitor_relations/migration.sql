/*
  Warnings:

  - You are about to drop the column `receivedGift` on the `Visitor` table. All the data in the column will be lost.
  - Added the required column `giftId` to the `Visitor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Visitor" DROP COLUMN "receivedGift",
ADD COLUMN     "giftId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_giftId_fkey" FOREIGN KEY ("giftId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
