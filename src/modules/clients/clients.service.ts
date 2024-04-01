import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/common/services';

@Injectable()
export class ClientsService {
  private readonly logger = new Logger('ClientsService');
  constructor(private readonly prisma: PrismaService) { }
  async create(createClientDto: CreateClientDto) {
    let {
      cli_birth_date,
      cli_dui_date_expedition,
      cli_dui_date_expiration,
      mar_code,
      gen_code,
      cli_dis_code_bussines,
      cli_dis_code,
      ...data
    }: any = createClientDto;
    cli_birth_date = new Date(cli_birth_date);
    cli_dui_date_expedition = new Date(cli_dui_date_expedition);
    cli_dui_date_expiration = new Date(cli_dui_date_expiration);

    mar_code = mar_code.length > 0 ? mar_code : null;
    gen_code = gen_code.length > 0 ? gen_code : null;
    cli_dis_code_bussines =
      cli_dis_code_bussines.length > 0 ? cli_dis_code_bussines : null;
    cli_dis_code = cli_dis_code.length > 0 ? cli_dis_code : null;
    const respDB = await this.prisma.nex_cli_clients.create({
      data: {
        cli_birth_date,
        mar_code,
        cli_dui_date_expedition,
        cli_dui_date_expiration,
        gen_code,
        cli_dis_code_bussines,
        cli_dis_code,
        ...data,
      },
    });
    return respDB;
  }

  async findAll() {
    return await this.prisma.nex_cli_clients.findMany({
      where: { cli_status: 'ACTIVE' },
    });
  }
  async findAllCatalog() {
    const [genders, departaments, education, marks, profession, relationship, civilStatus] =
      await Promise.all([
        await this.prisma.nex_gen_gender.findMany({
          where: { gen_status: 'ACTIVE' },
        }),
        await this.prisma.nex_dep_departament.findMany({
          where: { dep_status: 'ACTIVE' },
          include: {
            nex_mun_municipalities: {
              where: {
                mun_status: 'ACTIVE'
              },
              include: { nex_dis_districts: { where: { dis_status: 'ACTIVE' } } }
            }
          }
        }),
        await this.prisma.nex_edl_education_level.findMany({
          where: { edl_status: 'ACTIVE' },
        }),
        await this.prisma.nex_mar_markeds.findMany({
          where: { mar_status: 'ACTIVE' },
        }),
        await this.prisma.nex_prf_profession.findMany({
          where: { prf_status: 'ACTIVE' },
        }),
        await this.prisma.nex_rel_relationship.findMany({
          where: { rel_status: 'ACTIVE' },
        }),
        await this.prisma.nex_cis_civil_status.findMany({
          where: { cis_status: 'ACTIVE' },
        }),
      ]);
    return {
      genders,
      departaments,
      education,
      marks,
      profession,
      relationship,
      civilStatus,
    };
  }

  async findOne(cli_code: string) {
    const respDB = await this.prisma.nex_cli_clients.findFirst({
      where: { cli_code, cli_status: 'ACTIVE' },
    });
    if (!respDB) throw new NotFoundException('Registro no encontrado');
    return respDB;
  }

  async update(cli_code: string, updateClientDto: UpdateClientDto) {
    let {
      cli_birth_date,
      cli_dui_date_expedition,
      cli_dui_date_expiration,
      mar_code,
      gen_code,
      cli_dis_code_bussines,
      cli_dis_code,
      ...data
    }: any = updateClientDto;
    await this.findOne(cli_code);
    cli_birth_date = new Date(cli_birth_date);
    cli_dui_date_expedition = new Date(cli_dui_date_expedition);
    cli_dui_date_expiration = new Date(cli_dui_date_expiration);

    mar_code = mar_code.length > 0 ? mar_code : null;
    gen_code = gen_code.length > 0 ? gen_code : null;
    cli_dis_code_bussines =
      cli_dis_code_bussines.length > 0 ? cli_dis_code_bussines : null;
    cli_dis_code = cli_dis_code.length > 0 ? cli_dis_code : null;
    const respDB = await this.prisma.nex_cli_clients.update({
      where: {
        cli_code,
      },
      data: {
        cli_birth_date,
        mar_code,
        cli_dui_date_expedition,
        cli_dui_date_expiration,
        gen_code,
        cli_dis_code_bussines,
        cli_dis_code,
        ...data,
      },
    });
    return respDB;
  }

  async remove(cli_code: string) {
    await this.findOne(cli_code);
    return this.prisma.nex_cli_clients.update({
      where: {
        cli_code,
      },
      data: {
        cli_status: 'INACTIVE',
      },
    });
  }
}
