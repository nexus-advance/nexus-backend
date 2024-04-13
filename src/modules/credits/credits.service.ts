import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCreditDto } from './dto/create-credit.dto';
import { UpdateCreditDto } from './dto/update-credit.dto';
import { PrismaService } from 'src/common/services';
import { nex_usr_usuario } from '@prisma/client';
import { CreateAbonoDto } from './dto/create-abono.dto';
import { FilterAbonsoDto } from './dto/create-abono.dto copy';
import { TimeType, convert_date_yyyy_mm_dd } from 'src/common/helpers';

@Injectable()
export class CreditsService {
  private readonly logger = new Logger('CreditsService');
  constructor(private readonly prisma: PrismaService) { }

  async create(createCreditDto: CreateCreditDto, user: nex_usr_usuario) {

    let {
      cre_date_start: cre_date_start1,
      ...data
    }: any = createCreditDto;

    const clients = await this.prisma.nex_cli_clients.findFirst({
      where: {
        cli_code: data.cli_code
      }
    });
    if (!clients) new NotFoundException('El cliente no existe');
    const taxt = await this.prisma.nex_per_percentage.findFirst({
      where: {
        per_code: data.per_code
      }
    });
    if (!taxt) new NotFoundException('El porcentaje no esta configurado');

    const cre_date_start: any = new Date(cre_date_start1);
    const cre_date_finish = new Date(cre_date_start1);
    cre_date_finish.setDate(cre_date_finish.getDate() + data.cre_days);
    try {

      return await this.prisma.nex_cre_credits.create({
        data: {
          ...data,
          cre_date_start,
          cre_date_finish,
          usr_code: user.usr_code
        }
      });
    } catch (error) {
      this.logger.error(error);
      return 'Ha ocurrido un error al crear el credito';
    }
  }

  async findTaxt() {

    return await this.prisma.nex_per_percentage.findMany({
      where: {
        per_status: 'ACTIVE'
      }
    });
  }
  async findDues(filterAbonsoDto: FilterAbonsoDto) {
    const startDate = convert_date_yyyy_mm_dd(filterAbonsoDto.date, TimeType.Inicio);
    const endDate = convert_date_yyyy_mm_dd(filterAbonsoDto.date, TimeType.Fin);
    const credits = await this.prisma.nex_cre_credits.aggregate({
      where: {
        cre_status: 'ACTIVE'
      },
      _sum: {
        cre_daily_quota: true,
      },
    });
    const cuotas = await this.prisma.nex_abo_abonos.findMany({
      where: {
        abo_status: 'ACTIVE',
        abo_date_create: {
          gte: startDate,  // Mayor o igual 
          lte: endDate   // Menor o igual 
        }
      },
      orderBy: {
        abo_date_create: 'desc'
      },
      include: {
        nex_cre_credits: {
          include: {
            nex_cli_clients: true
          }
        }
      }
    });
    return { cuotas, credits: credits._sum.cre_daily_quota }
  }


  async generarAbono(createAbonoDto: CreateAbonoDto, user: nex_usr_usuario) {
    try {
      const resp = await this.prisma.nex_abo_abonos.create({
        data: {
          usr_code: user.usr_code,
          abo_cuota: createAbonoDto.amount,
          cre_code: createAbonoDto.cre_code
        }
      });
      const suma = await this.prisma.nex_abo_abonos.aggregate({
        where: {
          cre_code: createAbonoDto.cre_code
        },
        _sum: {
          abo_cuota: true,
        },
      })
      const credito = await this.prisma.nex_cre_credits.findFirst({
        where: {
          cre_code: createAbonoDto.cre_code
        },
      })
      if ((credito.cre_brut_amount - suma._sum.abo_cuota) <= 0) {
        await this.prisma.nex_cre_credits.update({
          where: {
            cre_code: createAbonoDto.cre_code
          },
          data: {
            cre_status: 'PAYED',
          }
        })
      }

      return resp;
    } catch (error) {
      return 'No se pudo generar el abono intentar mas tarde';
    }
  }
  async findAll() {
    return await this.prisma.nex_cre_credits.findMany({
      where: {
        cre_status: 'ACTIVE'
      },
      include: {
        nex_cli_clients: true,
        nex_per_percentage: true,
        nex_usr_usuario: true,
        nex_abo_abonos: true,
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} credit`;
  }

  update(id: number, updateCreditDto: UpdateCreditDto) {
    return `This action updates a #${id} credit`;
  }

  remove(id: number) {
    return `This action removes a #${id} credit`;
  }
}
