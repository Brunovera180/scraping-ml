/*
  Warnings:

  - You are about to alter the column `precio` on the `Producto` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,3)`.

*/
-- AlterTable
ALTER TABLE "Producto" ALTER COLUMN "precio" SET DATA TYPE DECIMAL(10,3),
ALTER COLUMN "link" DROP NOT NULL;
