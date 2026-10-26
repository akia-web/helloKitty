-- AlterTable
ALTER TABLE "Fish" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "hugeDescription" DROP NOT NULL,
ALTER COLUMN "regularDescription" DROP NOT NULL,
ALTER COLUMN "tinyDescription" DROP NOT NULL;
