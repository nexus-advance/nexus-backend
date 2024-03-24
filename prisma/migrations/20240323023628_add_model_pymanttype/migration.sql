/*
  Warnings:

  - You are about to drop the `pla_planillas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "pla_planillas";

-- CreateTable
CREATE TABLE "hos_pla_planillas" (
    "pla_code" TEXT NOT NULL,
    "pla_name" TEXT,
    "pla_days_works" TEXT,
    "pla_period" TEXT,
    "pla_date_start" TIMESTAMP(3),
    "pla_date_end" TIMESTAMP(3),
    "pla_date_create" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "pla_date_update" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "pla_payment_type" TEXT,
    "hos_pmt_payment_typePmt_code" TEXT,

    CONSTRAINT "hos_pla_pk" PRIMARY KEY ("pla_code")
);

-- CreateTable
CREATE TABLE "hos_pmt_payment_type" (
    "pmt_code" TEXT NOT NULL,
    "pmt_name" TEXT NOT NULL,
    "pmt_status" "Estado" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "hos_pmt_payment_type_pkey" PRIMARY KEY ("pmt_code")
);

-- AddForeignKey
ALTER TABLE "hos_pla_planillas" ADD CONSTRAINT "hos_pla_planillas_hos_pmt_payment_typePmt_code_fkey" FOREIGN KEY ("hos_pmt_payment_typePmt_code") REFERENCES "hos_pmt_payment_type"("pmt_code") ON DELETE SET NULL ON UPDATE CASCADE;
