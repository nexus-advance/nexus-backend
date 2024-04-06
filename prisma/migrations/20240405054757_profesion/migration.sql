-- AlterTable
ALTER TABLE "nex_cli_clients" ADD COLUMN     "prf_code" TEXT,
ADD COLUMN     "spouse_name" TEXT;

-- AddForeignKey
ALTER TABLE "nex_cli_clients" ADD CONSTRAINT "nex_cli_clients_prf_code_fkey" FOREIGN KEY ("prf_code") REFERENCES "nex_prf_profession"("prf_code") ON DELETE NO ACTION ON UPDATE NO ACTION;
