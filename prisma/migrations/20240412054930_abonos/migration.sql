-- CreateTable
CREATE TABLE "nex_abo_abonos" (
    "abo_code" TEXT NOT NULL,
    "abo_cuota" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "usr_code" TEXT,
    "cre_code" TEXT NOT NULL,
    "cre_status" "Estado" NOT NULL DEFAULT 'ACTIVE',
    "cre_date_create" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "cre_date_update" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nex_abo_abonos_pkey" PRIMARY KEY ("abo_code")
);

-- AddForeignKey
ALTER TABLE "nex_abo_abonos" ADD CONSTRAINT "nex_abo_abonos_usr_code_fkey" FOREIGN KEY ("usr_code") REFERENCES "nex_usr_usuario"("usr_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nex_abo_abonos" ADD CONSTRAINT "nex_abo_abonos_cre_code_fkey" FOREIGN KEY ("cre_code") REFERENCES "nex_cre_credits"("cre_code") ON DELETE NO ACTION ON UPDATE NO ACTION;
