-- AlterTable
ALTER TABLE "hos_pla_planillas" ADD COLUMN     "pla_codusr" TEXT;

-- AddForeignKey
ALTER TABLE "hos_pla_planillas" ADD CONSTRAINT "hos_pla_usr_fk" FOREIGN KEY ("pla_codusr") REFERENCES "hos_usr_usuario"("usr_code") ON DELETE NO ACTION ON UPDATE NO ACTION;
