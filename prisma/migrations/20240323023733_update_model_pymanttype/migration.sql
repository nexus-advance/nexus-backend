/*
  Warnings:

  - You are about to drop the column `hos_pmt_payment_typePmt_code` on the `hos_pla_planillas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "hos_pla_planillas" DROP CONSTRAINT "hos_pla_planillas_hos_pmt_payment_typePmt_code_fkey";

-- AlterTable
ALTER TABLE "hos_pla_planillas" DROP COLUMN "hos_pmt_payment_typePmt_code";

-- AddForeignKey
ALTER TABLE "hos_pla_planillas" ADD CONSTRAINT "hos_pla_planillas_pla_payment_type_fkey" FOREIGN KEY ("pla_payment_type") REFERENCES "hos_pmt_payment_type"("pmt_code") ON DELETE SET NULL ON UPDATE CASCADE;
