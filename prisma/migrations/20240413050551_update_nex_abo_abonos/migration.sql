/*
  Warnings:

  - You are about to drop the column `cre_date_create` on the `nex_abo_abonos` table. All the data in the column will be lost.
  - You are about to drop the column `cre_date_update` on the `nex_abo_abonos` table. All the data in the column will be lost.
  - You are about to drop the column `cre_status` on the `nex_abo_abonos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "nex_abo_abonos" DROP COLUMN "cre_date_create",
DROP COLUMN "cre_date_update",
DROP COLUMN "cre_status",
ADD COLUMN     "abo_date_create" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "abo_date_update" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "abo_status" "Estado" NOT NULL DEFAULT 'ACTIVE';
