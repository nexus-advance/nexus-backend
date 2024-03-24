-- CreateTable
CREATE TABLE "pla_planillas" (
    "pla_code" TEXT NOT NULL,
    "pla_naem" TEXT,
    "pla_days_works" TEXT,
    "pla_period" TEXT,
    "pla_date_start" TIMESTAMP(3),
    "pla_date_end" TIMESTAMP(3),
    "pla_date_create" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "pla_date_update" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hos_pla_pk" PRIMARY KEY ("pla_code")
);
