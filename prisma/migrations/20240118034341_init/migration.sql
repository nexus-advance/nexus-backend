-- CreateEnum
CREATE TYPE "EstadoDescuento" AS ENUM ('ACTIVE', 'CANCELED');

-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "hos_usr_usuario" (
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
    "usr_usrer_update" TEXT NOT NULL,

    CONSTRAINT "hos_usr_pk" PRIMARY KEY ("usr_code")
);

-- CreateTable
CREATE TABLE "hos_emp_employees" (
    "emp_code" TEXT NOT NULL,
    "emp_code_employee" TEXT NOT NULL,
    "emp_first_name" TEXT NOT NULL,
    "emp_second_name" TEXT NOT NULL,
    "emp_third_name" TEXT NOT NULL,
    "emp_first_surname" TEXT NOT NULL,
    "emp_second_surname" TEXT NOT NULL,
    "emp_married_surname" TEXT,
    "emp_codgen" TEXT NOT NULL,
    "emp_birth_date" DATE,
    "emp_admission_date" DATE,
    "emp_departure_date" DATE,
    "emp_address" TEXT,
    "emp_cel_phone" TEXT,
    "emp_dui" TEXT,
    "emp_nit" TEXT,
    "emp_isss" TEXT,
    "emp_afp" TEXT,
    "emp_hourly_wage" DECIMAL(10,2) DEFAULT 0,
    "emp_daily_wage" DECIMAL(10,2) DEFAULT 0,
    "emp_base_salary" DECIMAL(10,2) DEFAULT 0,
    "emp_viatic" DECIMAL(10,2) DEFAULT 0,
    "emp_complementary_diatic" DECIMAL(10,2) DEFAULT 0,
    "emp_codlad" TEXT NOT NULL,
    "emp_codjti" TEXT NOT NULL,
    "emp_codwst" TEXT NOT NULL,
    "emp_codempboss" TEXT,
    "emp_codusr" TEXT NOT NULL,
    "emp_status" "Estado" NOT NULL DEFAULT 'ACTIVE',
    "emp_date_create" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "emp_date_update" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hos_emp_pk" PRIMARY KEY ("emp_code")
);

-- CreateTable
CREATE TABLE "hos_des_employee_discounts" (
    "des_code" TEXT NOT NULL,
    "des_reference" TEXT NOT NULL,
    "emp_strat_date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "des_number_installments" INTEGER NOT NULL DEFAULT 0,
    "des_total_amount" DECIMAL(10,2) DEFAULT 0,
    "des_codemp" TEXT NOT NULL,
    "des_coddin" TEXT NOT NULL,
    "des_status" "EstadoDescuento" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "hos_des_pk" PRIMARY KEY ("des_code")
);

-- CreateTable
CREATE TABLE "hos_din_discount_institutions" (
    "din_code" TEXT NOT NULL,
    "din_name" TEXT NOT NULL,
    "din_status" "Estado" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "hos_din_pk" PRIMARY KEY ("din_code")
);

-- CreateTable
CREATE TABLE "hos_gen_genders" (
    "gen_code" TEXT NOT NULL,
    "gen_name" TEXT NOT NULL,
    "gen_status" "Estado" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "hos_gen_pk" PRIMARY KEY ("gen_code")
);

-- CreateTable
CREATE TABLE "hos_lad_labor_department" (
    "lad_code" TEXT NOT NULL,
    "lad_name" TEXT NOT NULL,
    "lad_status" "Estado" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "hos_lad_pk" PRIMARY KEY ("lad_code")
);

-- CreateTable
CREATE TABLE "hos_jti_job_title" (
    "jti_code" TEXT NOT NULL,
    "jti_name" TEXT NOT NULL,
    "jti_status" "Estado" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "hos_jti_pk" PRIMARY KEY ("jti_code")
);

-- CreateTable
CREATE TABLE "hos_wst_work_status" (
    "wst_code" TEXT NOT NULL,
    "wst_name" TEXT NOT NULL,
    "wst_status" "Estado" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "hos_wst_pk" PRIMARY KEY ("wst_code")
);

-- AddForeignKey
ALTER TABLE "hos_emp_employees" ADD CONSTRAINT "hos_emp_gen_fk" FOREIGN KEY ("emp_codgen") REFERENCES "hos_gen_genders"("gen_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hos_emp_employees" ADD CONSTRAINT "hos_emp_lad_fk" FOREIGN KEY ("emp_codlad") REFERENCES "hos_lad_labor_department"("lad_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hos_emp_employees" ADD CONSTRAINT "hos_emp_jti_fk" FOREIGN KEY ("emp_codjti") REFERENCES "hos_jti_job_title"("jti_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hos_emp_employees" ADD CONSTRAINT "hos_emp_wst_fk" FOREIGN KEY ("emp_codwst") REFERENCES "hos_wst_work_status"("wst_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hos_emp_employees" ADD CONSTRAINT "hos_emp_cod_fk" FOREIGN KEY ("emp_codempboss") REFERENCES "hos_emp_employees"("emp_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hos_emp_employees" ADD CONSTRAINT "hos_emp_usr_fk" FOREIGN KEY ("emp_codusr") REFERENCES "hos_usr_usuario"("usr_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hos_des_employee_discounts" ADD CONSTRAINT "hos_des_emp_fk" FOREIGN KEY ("des_codemp") REFERENCES "hos_emp_employees"("emp_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hos_des_employee_discounts" ADD CONSTRAINT "hos_des_din_fk" FOREIGN KEY ("des_coddin") REFERENCES "hos_din_discount_institutions"("din_code") ON DELETE NO ACTION ON UPDATE NO ACTION;
