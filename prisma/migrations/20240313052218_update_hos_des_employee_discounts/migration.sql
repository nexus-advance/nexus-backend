/*
  Warnings:

  - You are about to drop the column `des_number_installments` on the `hos_des_employee_discounts` table. All the data in the column will be lost.
  - You are about to drop the column `des_total_amount` on the `hos_des_employee_discounts` table. All the data in the column will be lost.
  - You are about to drop the column `emp_strat_date` on the `hos_des_employee_discounts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "hos_des_employee_discounts" DROP COLUMN "des_number_installments",
DROP COLUMN "des_total_amount",
DROP COLUMN "emp_strat_date",
ADD COLUMN     "des_amount" DECIMAL(10,2) DEFAULT 0,
ADD COLUMN     "des_number_dues" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "emp_end_date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "emp_start_date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;
