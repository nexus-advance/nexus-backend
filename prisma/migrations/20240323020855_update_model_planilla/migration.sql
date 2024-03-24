/*
  Warnings:

  - You are about to drop the column `pla_naem` on the `pla_planillas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pla_planillas" DROP COLUMN "pla_naem",
ADD COLUMN     "pla_name" TEXT;
