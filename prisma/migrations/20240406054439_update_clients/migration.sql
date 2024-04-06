/*
  Warnings:

  - You are about to drop the column `children_number` on the `nex_cli_clients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "nex_cli_clients" DROP COLUMN "children_number",
ADD COLUMN     "cls_children_number" TEXT;
