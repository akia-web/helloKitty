-- CreateEnum
CREATE TYPE "Rarity" AS ENUM ('COMMON', 'UNCOMMON', 'RARE');

-- CreateTable
CREATE TABLE "Fish" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "rarity" "Rarity" NOT NULL,
    "isMorning" BOOLEAN NOT NULL,
    "isDayTime" BOOLEAN NOT NULL,
    "isEvening" BOOLEAN NOT NULL,
    "isNight" BOOLEAN NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "regionId" INTEGER NOT NULL,

    CONSTRAINT "Fish_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fish_name_key" ON "Fish"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Region_name_key" ON "Region"("name");

-- AddForeignKey
ALTER TABLE "Fish" ADD CONSTRAINT "Fish_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
