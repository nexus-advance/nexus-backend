-- AlterTable
ALTER TABLE "nex_cli_clients" ADD COLUMN     "cis_code" TEXT;

-- CreateTable
CREATE TABLE "nex_cis_civil_status" (
    "cis_code" TEXT NOT NULL,
    "cis_names" TEXT NOT NULL,
    "cis_status" "Estado" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "nex_cis_civil_status_pkey" PRIMARY KEY ("cis_code")
);

-- AddForeignKey
ALTER TABLE "nex_cli_clients" ADD CONSTRAINT "nex_cli_clients_cis_code_fkey" FOREIGN KEY ("cis_code") REFERENCES "nex_cis_civil_status"("cis_code") ON DELETE NO ACTION ON UPDATE NO ACTION;
