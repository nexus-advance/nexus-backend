/*
  Warnings:

  - You are about to drop the column `cli_date_expedition` on the `nex_cli_clients` table. All the data in the column will be lost.
  - You are about to drop the column `cli_expirtion_expiration` on the `nex_cli_clients` table. All the data in the column will be lost.
  - Added the required column `cli_dui_date_expedition` to the `nex_cli_clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cli_dui_date_expiration` to the `nex_cli_clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "nex_cli_clients" DROP COLUMN "cli_date_expedition",
DROP COLUMN "cli_expirtion_expiration",
ADD COLUMN     "cli_dui_date_expedition" TEXT NOT NULL,
ADD COLUMN     "cli_dui_date_expiration" TEXT NOT NULL;
