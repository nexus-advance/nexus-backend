import { Injectable, Logger } from '@nestjs/common';
import { CreatePlanillaDto } from './dto/create-planilla.dto';
import { UpdatePlanillaDto } from './dto/update-planilla.dto';
import { PrismaService } from 'src/common/services';
import { hos_pla_planillas, hos_usr_usuario } from '@prisma/client';

@Injectable()
export class PlanillasService {
  private readonly logger = new Logger('PlanillasService');

  constructor(
    private readonly prisma: PrismaService,
  ) { }
  async create(createPlanillaDto: CreatePlanillaDto, user: hos_usr_usuario) {
    const year = new Date().getFullYear();
    const startDate = new Date(year, Number(createPlanillaDto.pla_period), 1, 0, 0, 0, 0);
    const endDate = new Date(year, Number(createPlanillaDto.pla_period) + 1, 0, 23, 59, 59, 999);
    return await this.prisma.hos_pla_planillas.create({
      data: {
        pla_name: createPlanillaDto.pla_name,
        pla_days_works: this.differenceInDays(startDate, endDate).toString(),
        pla_period: createPlanillaDto.pla_payment_type,
        pla_date_start: startDate,
        pla_date_end: endDate,
        pla_payment_type: createPlanillaDto.pla_payment_type,
        pla_codusr: user.usr_code
      }
    });
  }
  differenceInDays(date1: Date, date2: Date): number {
    const msPerDay = 24 * 60 * 60 * 1000;
    const differenceMs = Math.abs(date2.getTime() - date1.getTime());
    return Math.round(differenceMs / msPerDay);
  }
  async findAll() {
    return this.prisma.hos_pla_planillas.findMany({
      where: {
        pla_status: 'ACTIVE'
      },
      include: {
        hos_pmt_payment_type: true,
        hos_usr_usuario: true
      }
    });
  }

  async findOne(id: string) {
    return await this.prisma.hos_pla_planillas.findFirst({
      where: {
        pla_status: 'ACTIVE',
        pla_code: id,
      },
      include: {
        hos_pmt_payment_type: true,
        hos_usr_usuario: true
      }
    });
  }
  async paymentType() {
    return await this.prisma.hos_pmt_payment_type.findMany({
      where: {
        pmt_status: 'ACTIVE'
      }
    });
  }
  async getCatalogs() {
    const paymentsType = await this.paymentType();
    const mounts = await this.paymentMonth();
    const employes = await this.prisma.hos_emp_employees.findMany({
      where: { emp_status: 'ACTIVE' }, include: {
        hos_des_employee_discounts: { include: { hos_din_discount_institutions: true } }
      }
    });
    return { paymentsType, mounts, employes }
  }
  paymentMonth() {
    return [
      {
        id: 1,
        name: 'Enero'
      },
      {
        id: 2,
        name: 'Febrero'
      },
      {
        id: 3,
        name: 'Marzo'
      },
      {
        id: 4,
        name: 'Abril'
      },
      {
        id: 5,
        name: 'Mayo'
      },
      {
        id: 6,
        name: 'Junio'
      },
      {
        id: 7,
        name: 'Julio'
      },
      {
        id: 8,
        name: 'Agosto'
      },
      {
        id: 9,
        name: 'Septiembre'
      },
      {
        id: 10,
        name: 'Octubre'
      },
      {
        id: 11,
        name: 'Noviembre'
      },
      {
        id: 12,
        name: 'Diciembre'
      }
    ];
  }

  update(id: number, updatePlanillaDto: UpdatePlanillaDto) {
    return `This action updates a #${id} planilla`;
  }

  remove(id: number) {
    return `This action removes a #${id} planilla`;
  }
}
