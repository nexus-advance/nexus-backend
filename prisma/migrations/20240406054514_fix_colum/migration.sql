/*
  Warnings:

  - You are about to drop the column `cls_children_number` on the `nex_cli_clients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "nex_cli_clients" DROP COLUMN "cls_children_number",
ADD COLUMN     "cli_children_number" TEXT;
