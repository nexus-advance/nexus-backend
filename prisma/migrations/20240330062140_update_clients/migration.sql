/*
  Warnings:

  - The `cli_dui_date_expedition` column on the `nex_cli_clients` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `cli_dui_date_expiration` column on the `nex_cli_clients` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "nex_cli_clients" DROP COLUMN "cli_dui_date_expedition",
ADD COLUMN     "cli_dui_date_expedition" DATE,
DROP COLUMN "cli_dui_date_expiration",
ADD COLUMN     "cli_dui_date_expiration" DATE;
