-- CreateEnum
CREATE TYPE "EstadoCredit" AS ENUM ('ACTIVE', 'PAYED', 'DELETED');

-- CreateTable
CREATE TABLE "nex_cre_credits" (
    "cre_code" TEXT NOT NULL,
    "cre_days" INTEGER NOT NULL DEFAULT 0,
    "cre_daily_quota" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "cre_neto_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "cre_tax_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "cre_brut_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "cre_date_finish" DATE,
    "cli_code" TEXT NOT NULL,
    "per_code" TEXT NOT NULL,
    "cre_status" "EstadoCredit" NOT NULL DEFAULT 'ACTIVE',
    "cre_date_create" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "cre_date_update" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nex_cre_credits_pkey" PRIMARY KEY ("cre_code")
);

-- AddForeignKey
ALTER TABLE "nex_cre_credits" ADD CONSTRAINT "nex_cre_credits_cli_code_fkey" FOREIGN KEY ("cli_code") REFERENCES "nex_cli_clients"("cli_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nex_cre_credits" ADD CONSTRAINT "nex_cre_credits_per_code_fkey" FOREIGN KEY ("per_code") REFERENCES "nex_per_percentage"("per_code") ON DELETE NO ACTION ON UPDATE NO ACTION;
