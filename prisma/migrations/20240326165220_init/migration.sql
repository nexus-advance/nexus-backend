-- CreateEnum
CREATE TYPE "FefTipe" AS ENUM ('FAMILY', 'FRIEND');

-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "nex_usr_usuario" (
    "usr_code" TEXT NOT NULL,
    "usr_code_employe" TEXT NOT NULL,
    "usr_names" TEXT NOT NULL,
    "usr_surnames" TEXT NOT NULL,
    "usr_password" TEXT NOT NULL,
    "usr_attempts_faile" SMALLINT NOT NULL DEFAULT 0,
    "usr_status" "Estado" NOT NULL DEFAULT 'ACTIVE',
    "usr_date_create" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usr_date_update" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usr_user_create" TEXT NOT NULL,
    "usr_user_update" TEXT NOT NULL,

    CONSTRAINT "nex_usr_usuario_pkey" PRIMARY KEY ("usr_code")
);

-- CreateTable
CREATE TABLE "nex_gen_gender" (
    "gen_code" TEXT NOT NULL,
    "gen_names" TEXT NOT NULL,

    CONSTRAINT "nex_gen_gender_pkey" PRIMARY KEY ("gen_code")
);

-- CreateTable
CREATE TABLE "nex_prf_profession" (
    "prf_code" TEXT NOT NULL,
    "prf_names" TEXT NOT NULL,
    "prf_status" "Estado" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "nex_prf_profession_pkey" PRIMARY KEY ("prf_code")
);

-- CreateTable
CREATE TABLE "nex_edl_education_level" (
    "edl_code" TEXT NOT NULL,
    "edl_names" TEXT NOT NULL,
    "edl_status" "Estado" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "nex_edl_education_level_pkey" PRIMARY KEY ("edl_code")
);

-- CreateTable
CREATE TABLE "nex_dep_departament" (
    "dep_code" TEXT NOT NULL,
    "dep_names" TEXT NOT NULL,
    "dep_status" "Estado" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "nex_dep_departament_pkey" PRIMARY KEY ("dep_code")
);

-- CreateTable
CREATE TABLE "nex_mun_municipalities" (
    "mun_code" TEXT NOT NULL,
    "mun_names" TEXT NOT NULL,
    "mun_status" "Estado" NOT NULL DEFAULT 'ACTIVE',
    "dep_code" TEXT NOT NULL,

    CONSTRAINT "nex_mun_municipalities_pkey" PRIMARY KEY ("mun_code")
);

-- CreateTable
CREATE TABLE "nex_mar_markeds" (
    "mar_code" TEXT NOT NULL,
    "mar_name" TEXT NOT NULL,
    "mar_status" "Estado" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "nex_mar_markeds_pkey" PRIMARY KEY ("mar_code")
);

-- CreateTable
CREATE TABLE "nex_dis_districts" (
    "dis_code" TEXT NOT NULL,
    "dis_names" TEXT NOT NULL,
    "dis_status" "Estado" NOT NULL DEFAULT 'ACTIVE',
    "mun_code" TEXT NOT NULL,

    CONSTRAINT "nex_dis_districts_pkey" PRIMARY KEY ("dis_code")
);

-- CreateTable
CREATE TABLE "nex_cli_clients" (
    "cli_code" TEXT NOT NULL,
    "cli_full_name" TEXT NOT NULL,
    "cli_birth_date" DATE NOT NULL,
    "mar_code" TEXT NOT NULL,
    "cli_dui" TEXT NOT NULL,
    "cli_place_expedition" TEXT NOT NULL,
    "cli_date_expedition" TEXT NOT NULL,
    "cli_expirtion_expiration" TEXT NOT NULL,
    "gen_code" TEXT NOT NULL,
    "cli_is_taxpayer" BOOLEAN NOT NULL,
    "cli_no_taxpayer" TEXT NOT NULL,
    "cli_mount_month" DOUBLE PRECISION NOT NULL,
    "cli_have_other_incomer" BOOLEAN NOT NULL,
    "cli_bussiness_tipe" TEXT NOT NULL,
    "cli_time_bussiness" INTEGER NOT NULL,
    "cli_address_bussiness" TEXT NOT NULL,
    "cli_dep_code_bussines" TEXT NOT NULL,
    "cli_mun_code_bussines" TEXT NOT NULL,
    "cli_dis_code_bussines" TEXT NOT NULL,
    "cli_daily_sell" DOUBLE PRECISION NOT NULL,
    "cli_daily_buy" DOUBLE PRECISION NOT NULL,
    "cli_daily_gain" DOUBLE PRECISION NOT NULL,
    "cli_address" TEXT NOT NULL,
    "cli_phone" TEXT NOT NULL,
    "cli_cell_phone" TEXT NOT NULL,
    "cli_dep_code" TEXT NOT NULL,
    "cli_mun_code" TEXT NOT NULL,
    "cli_dis_code" TEXT NOT NULL,
    "cli_time_alive" INTEGER NOT NULL,
    "cli_tenant_name" TEXT NOT NULL,
    "cli_tenant_phone" TEXT NOT NULL,
    "cli_status" "Estado" NOT NULL DEFAULT 'ACTIVE',
    "cli_date_create" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cli_date_update" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nex_cli_clients_pkey" PRIMARY KEY ("cli_code")
);

-- CreateTable
CREATE TABLE "nex_rel_relationship" (
    "rel_code" TEXT NOT NULL,
    "rel_names" TEXT NOT NULL,

    CONSTRAINT "nex_rel_relationship_pkey" PRIMARY KEY ("rel_code")
);

-- CreateTable
CREATE TABLE "nex_ref_references" (
    "ref_code" TEXT NOT NULL,
    "ref_tipe" "FefTipe" NOT NULL DEFAULT 'FAMILY',
    "ref_name" TEXT NOT NULL,
    "rel_code" TEXT NOT NULL,
    "ref_address" TEXT NOT NULL,
    "ref_work_place" TEXT NOT NULL,
    "ref_phone" TEXT NOT NULL,
    "ref_status" "Estado" NOT NULL DEFAULT 'ACTIVE',
    "cli_code" TEXT NOT NULL,

    CONSTRAINT "nex_ref_references_pkey" PRIMARY KEY ("ref_code")
);

-- AddForeignKey
ALTER TABLE "nex_mun_municipalities" ADD CONSTRAINT "nex_mun_municipalities_dep_code_fkey" FOREIGN KEY ("dep_code") REFERENCES "nex_dep_departament"("dep_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nex_dis_districts" ADD CONSTRAINT "nex_dis_districts_mun_code_fkey" FOREIGN KEY ("mun_code") REFERENCES "nex_mun_municipalities"("mun_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nex_cli_clients" ADD CONSTRAINT "nex_cli_clients_mar_code_fkey" FOREIGN KEY ("mar_code") REFERENCES "nex_mar_markeds"("mar_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nex_cli_clients" ADD CONSTRAINT "nex_cli_clients_gen_code_fkey" FOREIGN KEY ("gen_code") REFERENCES "nex_gen_gender"("gen_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nex_cli_clients" ADD CONSTRAINT "nex_cli_clients_cli_dis_code_bussines_fkey" FOREIGN KEY ("cli_dis_code_bussines") REFERENCES "nex_dis_districts"("dis_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nex_cli_clients" ADD CONSTRAINT "nex_cli_clients_cli_dis_code_fkey" FOREIGN KEY ("cli_dis_code") REFERENCES "nex_dis_districts"("dis_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nex_ref_references" ADD CONSTRAINT "nex_ref_references_rel_code_fkey" FOREIGN KEY ("rel_code") REFERENCES "nex_rel_relationship"("rel_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nex_ref_references" ADD CONSTRAINT "nex_ref_references_cli_code_fkey" FOREIGN KEY ("cli_code") REFERENCES "nex_cli_clients"("cli_code") ON DELETE NO ACTION ON UPDATE NO ACTION;
