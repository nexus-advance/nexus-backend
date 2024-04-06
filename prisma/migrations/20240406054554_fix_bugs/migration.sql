/*
  Warnings:

  - You are about to drop the column `cli_cli_email` on the `nex_cli_clients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "nex_cli_clients" DROP COLUMN "cli_cli_email",
ADD COLUMN     "cli_email" TEXT;
