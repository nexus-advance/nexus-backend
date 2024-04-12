-- CreateTable
CREATE TABLE "nex_per_percentage" (
    "per_code" TEXT NOT NULL,
    "per_days" INTEGER NOT NULL,
    "per_rate" INTEGER NOT NULL,
    "per_status" "Estado" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "nex_per_percentage_pkey" PRIMARY KEY ("per_code")
);
