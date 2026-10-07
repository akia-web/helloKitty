-- CreateTable
CREATE TABLE "FlowerColor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "FlowerColor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FlowerToFlowerColor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_FlowerToFlowerColor_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "FlowerColor_name_key" ON "FlowerColor"("name");

-- CreateIndex
CREATE INDEX "_FlowerToFlowerColor_B_index" ON "_FlowerToFlowerColor"("B");

-- AddForeignKey
ALTER TABLE "_FlowerToFlowerColor" ADD CONSTRAINT "_FlowerToFlowerColor_A_fkey" FOREIGN KEY ("A") REFERENCES "Flower"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FlowerToFlowerColor" ADD CONSTRAINT "_FlowerToFlowerColor_B_fkey" FOREIGN KEY ("B") REFERENCES "FlowerColor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
