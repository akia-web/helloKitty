-- AlterTable
ALTER TABLE "Visitor" ADD COLUMN     "characterId" INTEGER;

-- AddForeignKey
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;
