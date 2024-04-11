import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/common/services';
import { IsUUID } from 'class-validator';
import { CreateReferenceDto } from './dto/create-reference.dto';

@Injectable()
export class ClientsService {
  private readonly logger = new Logger('ClientsService');
  constructor(private readonly prisma: PrismaService) {}
  async createRefence(createReferenceDto: CreateReferenceDto) {
    try {
      return await this.prisma.nex_ref_references.create({
        data: {
          ...createReferenceDto,
        },
      });
    } catch (error) {
      this.logger.log(error);
      return 'Ha ocurrido un error';
    }
  }
  async create(createClientDto: CreateClientDto) {
    let {
      cli_birth_date,
      cli_dui_date_expedition,
      cli_dui_date_expiration,
      ...data
    }: any = createClientDto;
    cli_birth_date = new Date(cli_birth_date);
    cli_dui_date_expedition = new Date(cli_dui_date_expedition);
    cli_dui_date_expiration = new Date(cli_dui_date_expiration);
    const respDB = await this.prisma.nex_cli_clients.create({
      data: {
        cli_birth_date,
        cli_dui_date_expedition,
        cli_dui_date_expiration,
        ...data,
      },
    });
    return respDB;
  }

  async findAll() {
    return await this.prisma.nex_cli_clients.findMany({
      where: { cli_status: 'ACTIVE' },
      include: {
        nex_mar_markeds: true,
        nex_cis_civil_status: true,
        nex_gen_gender: true,
        nex_dis_districts_bussinees: true,
        nex_dis_districts_client: {
          include: {
            nex_mun_municipalities: { include: { nex_dep_departament: true } },
          },
        },
      },
    });
  }
  async findAllCatalog() {
    const [
      genders,
      departaments,
      education,
      marks,
      profession,
      relationship,
      civilStatus,
    ] = await Promise.all([
      await this.prisma.nex_gen_gender.findMany({
        where: { gen_status: 'ACTIVE' },
      }),
      await this.prisma.nex_dep_departament.findMany({
        where: { dep_status: 'ACTIVE' },
        include: {
          nex_mun_municipalities: {
            where: {
              mun_status: 'ACTIVE',
            },
            include: { nex_dis_districts: { where: { dis_status: 'ACTIVE' } } },
          },
        },
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

  async findReferences(cli_code: string) {
    return await this.prisma.nex_ref_references.findMany({
      where: { cli_code, ref_status: 'ACTIVE' },
      include: {
        nex_rel_relationship: true,
      },
    });
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
      ...data
    }: any = updateClientDto;
    await this.findOne(cli_code);
    cli_birth_date = new Date(cli_birth_date);
    cli_dui_date_expedition = new Date(cli_dui_date_expedition);
    cli_dui_date_expiration = new Date(cli_dui_date_expiration);

    return await this.prisma.nex_cli_clients.update({
      where: {
        cli_code,
      },
      data: {
        cli_birth_date,
        cli_dui_date_expedition,
        cli_dui_date_expiration,
        ...data,
      },
    });
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
  async removeReference(ref_code: string) {
    return this.prisma.nex_ref_references.update({
      where: {
        ref_code,
      },
      data: {
        ref_status: 'INACTIVE',
      },
    });
  }
}
