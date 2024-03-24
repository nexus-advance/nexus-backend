/*
  Warnings:

  - Added the required column `des_codusr` to the `hos_des_employee_discounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hos_des_employee_discounts" ADD COLUMN     "des_codusr" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "hos_des_employee_discounts" ADD CONSTRAINT "hos_des_usr_fk" FOREIGN KEY ("des_codusr") REFERENCES "hos_usr_usuario"("usr_code") ON DELETE NO ACTION ON UPDATE NO ACTION;
