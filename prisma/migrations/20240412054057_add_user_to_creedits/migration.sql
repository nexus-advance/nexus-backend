-- AlterTable
ALTER TABLE "nex_cre_credits" ADD COLUMN     "usr_code" TEXT;

-- AddForeignKey
ALTER TABLE "nex_cre_credits" ADD CONSTRAINT "nex_cre_credits_usr_code_fkey" FOREIGN KEY ("usr_code") REFERENCES "nex_usr_usuario"("usr_code") ON DELETE NO ACTION ON UPDATE NO ACTION;
