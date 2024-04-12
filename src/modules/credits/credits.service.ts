import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCreditDto } from './dto/create-credit.dto';
import { UpdateCreditDto } from './dto/update-credit.dto';
import { PrismaService } from 'src/common/services';

@Injectable()
export class CreditsService {
  private readonly logger = new Logger('CreditsService');
  constructor(private readonly prisma: PrismaService) { }

  async create(createCreditDto: CreateCreditDto) {

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
          cre_date_finish
        }
      });
    } catch (error) {
      this.logger.error(error );
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
  findAll() {
    return `This action returns all credits`;
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
