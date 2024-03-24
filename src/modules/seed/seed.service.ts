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
      await this.prisma.nex_usr_usuario.create({
        data: {
          usr_code_employe: '9505002',
          usr_names: 'Reynaldo Alexander',
          usr_surnames: 'Ruiz Rosales',
          usr_password: bcrypt.hashSync('9505002', 10),
          usr_attempts_faile: 0,
          usr_status: 'ACTIVE',
          usr_user_create: cremod,
          usr_user_update: cremod,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
