/*
  Warnings:

  - You are about to drop the column `isResident` on the `Visitor` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `Visitor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Visitor" DROP COLUMN "isResident",
DROP COLUMN "level";

-- CreateTable
CREATE TABLE "VisitorUser" (
    "userId" INTEGER NOT NULL,
    "visitorId" INTEGER NOT NULL,
    "isResident" BOOLEAN NOT NULL DEFAULT false,
    "isFav" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "VisitorUser_pkey" PRIMARY KEY ("userId","visitorId")
);

-- AddForeignKey
ALTER TABLE "VisitorUser" ADD CONSTRAINT "VisitorUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitorUser" ADD CONSTRAINT "VisitorUser_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "Visitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
