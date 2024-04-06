-- AlterTable
ALTER TABLE "nex_cli_clients" ADD COLUMN     "edl_code" TEXT;

-- AddForeignKey
ALTER TABLE "nex_cli_clients" ADD CONSTRAINT "nex_cli_clients_edl_code_fkey" FOREIGN KEY ("edl_code") REFERENCES "nex_edl_education_level"("edl_code") ON DELETE NO ACTION ON UPDATE NO ACTION;
