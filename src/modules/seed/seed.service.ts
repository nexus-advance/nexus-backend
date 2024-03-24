import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/services';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  private readonly logger = new Logger('UsersService');

  constructor(private readonly prisma: PrismaService) { }

  async obtenerNombresDeTablas(prisma) {
    // Esta consulta obtiene los nombres de todas las tablas públicas que no son del sistema
    const tablas = await prisma.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname='public' AND tablename NOT LIKE 'pg_%' AND tablename NOT LIKE '_prisma_%' AND tablename NOT LIKE 'sql_%';`;
    return tablas.map(t => t.tablename);
  }

  async deleteSeed() {
    const tablas = await this.obtenerNombresDeTablas(this.prisma);
    for (const nombreTabla of tablas) {
      await this.prisma.$executeRawUnsafe(`TRUNCATE TABLE "${nombreTabla}" RESTART IDENTITY CASCADE;`);
    }
  }

  async executeSeed() {
    try {
      await this.deleteSeed();
      var cremod = 'Creado por el seeder';
      var data: any = {
        usr_code_employe: '9505002',
        usr_names: 'Reynaldo Alexander',
        usr_surnames: 'Ruiz Rosales',
        usr_password: bcrypt.hashSync('9505002', 10),
        usr_attempts_faile: 0,
        usr_status: 'ACTIVE',
        usr_user_create: cremod,
        usr_usrer_update: cremod,
      };
      await this.prisma.hos_usr_usuario.create({
        data: data,
      });
      await this.prisma.hos_gen_genders.create({
        data: {
          gen_name: 'Masculino',
        },
      });
      await this.prisma.hos_gen_genders.create({
        data: {
          gen_name: 'Femenino',
        },
      });

      await this.prisma.hos_lad_labor_department.createMany({
        data: [
          { lad_name: 'ADMINISTRATIVO', },
          { lad_name: 'OPERARIOS', },
          { lad_name: 'OBREROS', },
          { lad_name: 'PROFESIONALES', },
          { lad_name: 'TECNICOS', },
        ]
      });

      await this.prisma.hos_jti_job_title.createMany({
        data: [
          { jti_name: 'Tipo 1', },
          { jti_name: 'Tipo 2', },
          { jti_name: 'Tipo 3', },
        ]
      });

      await this.prisma.hos_wst_work_status.createMany({
        data: [
          { wst_name: 'Estado 1', },
          { wst_name: 'Estado 2', },
          { wst_name: 'Estado 3', },
        ]
      });
      await this.prisma.hos_pmt_payment_type.createMany({
        data: [
          { pmt_name: 'Quincenal', },
          { pmt_name: 'Mensual', },
        ]
      });


      await this.prisma.hos_din_discount_institutions.createMany({
        data: [
          { din_name: 'SCOTIABANK' },
          { din_name: 'BANCO AGRICOLA' },
          { din_name: 'C.C.OLOCUILTA' },
          { din_name: 'PGR' },
          { din_name: 'IPSFA' },
          { din_name: 'C.C. CANDELARIA DE LA FRONTERA' },
          { din_name: 'BANCO DE FOMENTO AGROPECUARIO' },
          { din_name: 'SIHUACOOP' },
          { din_name: 'INPEP' },
          { din_name: 'PROCURADURIA' },
          { din_name: 'ISSS' },
          { din_name: 'AFP CONFIA' },
          { din_name: 'AFP CRECER' },
          { din_name: 'RENTA' },
          { din_name: 'INSAFORP' },
          { din_name: 'VIALIDAD' },
          { din_name: 'INCAP. LAB. APLICADA' },
          { din_name: 'ACECENTA DE R.L' },
          { din_name: 'CAJA DE CREDITO DE JUAYUA' },
          { din_name: 'BANCO HIPOTECARIO' },
          { din_name: 'Otros Descuentos ' },
          { din_name: 'PRESTA AGIL' },
          { din_name: 'ACACESPSA DE R.L' },
          { din_name: 'ASITRAMUCHAL ' },
          { din_name: 'SICHAL TRAMU' },
          { din_name: 'COOP-1' },
          { din_name: 'ACACSEMERSA' },
          { din_name: 'FUNDECREDITO' },
          { din_name: 'OPTICAS LA ELEGANCIA' },
          { din_name: 'S. F. LA AUXILIADORA' },
          { din_name: 'I.F. DE E.S., S.A. DE C.V.' },
          { din_name: 'PRIMER BCO. DE LOS TRABAJADORES ' },
          { din_name: 'CREDITO REAL S.A. DE C.V.' },
          { din_name: 'CAMETRO' },
          { din_name: 'BANCO DE LOS TRABAJADORES S.A DE C.V.' },
          { din_name: 'INCAP. NO APLI CADA' },
          { din_name: 'PERM. SIN GOCE DE SUELDO' },
          { din_name: 'ALTERNATIVA REAL' },
          { din_name: 'DESC. HRS. NO LABORADAS' },
          { din_name: 'PRIMER BCO DE LOS TRAB. SS' },
          { din_name: 'OPTICA NUEVA VISION' },
          { din_name: 'MULTA POR CONTRAVENIR ART. 30 INC 1º DE LA LJCA' },
          { din_name: 'DESC. DIAS NO LABORADOS' },
          { din_name: 'MULTA RESOLUCION 17-2018 CSJ' },
          { din_name: 'CODEZA DE R.L.' },
          { din_name: 'CAJA DE CREDITO DE AHUACHAPAN' },
          { din_name: 'ACOPACTO DE R.L.' },
          { din_name: 'ACACI DE R.L.' },
          { din_name: 'COASPAE DE R.L.' },
          { din_name: 'AGEPYM' },
          { din_name: 'PROCURADURIA DE SONSONATE' },
          { din_name: 'EMBARGOS' },
          { din_name: 'MAPFRE SEGUROS EL SALVADOR S.A.' },
          { din_name: 'ACACME DE R.L.' },
          { din_name: 'ACEPYMES DE R.L.' },
          { din_name: 'CAJA DE CREDITO DE IZALCO' },
          { din_name: 'F.S.V. (FINANCIAMIENTO)' },
          { din_name: 'BANCO DAVIVIENDA' },
          { din_name: 'OPTICA ALTA VISION' },
          { din_name: 'FONDO SOCIAL PARA LA VIVIENDA' },
          { din_name: 'ASTRAM' },
          { din_name: 'INTEGRAL SOCIEDAD DE AHORRO Y CREDITO' },
          { din_name: 'CAJA DE CREDITO DE SONSONATE' },
          { din_name: 'SITRAMA' },
          { din_name: 'CAJA DE CREDITO DE ACAJUTLA' },
          { din_name: 'BANCO CUSCATLAN S.V., S.A.' },
          { din_name: 'BANCO DE AMERICA CENTRAL' },
          { din_name: 'BANCO PROMERICA' },
          { din_name: 'BANCO IZALQUEÑO' },
          { din_name: 'ASISTENCIA FUNERARIA LA AUXILIADORA' },
          { din_name: 'ACACEMS de  R.L.' },
          { din_name: 'ACACEMS  DE R.L. AHORRO PROG.' },
          { din_name: 'CACTIUSA DE R.L.' },
          { din_name: 'ASOCIACION HPH EL SALVADOR' },
          { din_name: 'COMEDICA DE R.L.' },
          { din_name: 'OPTICA ARTE VISUAL' },
          { din_name: 'Sueldos' },
          { din_name: 'Sueldos Liquidos' },
          { din_name: 'Renta Empleados' },
          { din_name: 'Cotización ISSS' },
          { din_name: 'Procuraduria' },
          { din_name: 'DESCUENTO DE LLEGADAS TARDIAS' },
          { din_name: 'REINTEGROS' },
          { din_name: 'OPTICAS CV' },
          { din_name: 'OPTICA VISION' },
          { din_name: 'COSTISSS DE R.L.' },
          { din_name: 'OPTICA MULTIVISION' },

        ]
      });
    } catch (error) {
      console.log(error);
    }
  }
}
