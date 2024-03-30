-- AlterTable
ALTER TABLE "nex_gen_gender" ADD COLUMN     "gen_status" "Estado" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "nex_rel_relationship" ADD COLUMN     "rel_status" "Estado" NOT NULL DEFAULT 'ACTIVE';
