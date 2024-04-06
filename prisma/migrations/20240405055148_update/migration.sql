/*
  Warnings:

  - You are about to drop the column `cli_email` on the `nex_cli_clients` table. All the data in the column will be lost.
  - You are about to drop the column `spouse_name` on the `nex_cli_clients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "nex_cli_clients" DROP COLUMN "cli_email",
DROP COLUMN "spouse_name",
ADD COLUMN     "cli_cli_email" TEXT,
ADD COLUMN     "cli_spouse_name" TEXT;
