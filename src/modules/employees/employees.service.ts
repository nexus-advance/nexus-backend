import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { hos_usr_usuario } from '@prisma/client';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/common/services';
import { convert_date } from 'src/common/helpers';
import { CreateDisountDTO } from './dto/create-discount.dto';

@Injectable()
export class EmployeesService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }
  async create(createEmployeeDto: CreateEmployeeDto, hos_usr_usuario: hos_usr_usuario) {
    let { emp_birth_date, emp_admission_date, emp_departure_date, ...respto }: any = createEmployeeDto;

    emp_birth_date = convert_date(emp_birth_date);
    emp_admission_date = convert_date(emp_admission_date);
    emp_departure_date = convert_date(emp_departure_date);


    const [
      hos_gen_genders,
      hos_lad_labor_department,
      hos_jti_job_title,
      hos_wst_work_status,
    ] = await Promise.all([
      await this.prisma.hos_gen_genders.findFirst({ where: { gen_code: respto.emp_codgen } }),
      await this.prisma.hos_lad_labor_department.findFirst({ where: { lad_code: respto.emp_codlad } }),
      await this.prisma.hos_jti_job_title.findFirst({ where: { jti_code: respto.emp_codjti } }),
      await this.prisma.hos_wst_work_status.findFirst({ where: { wst_code: respto.emp_codws } }),
    ]);
    if (!hos_gen_genders) throw new NotFoundException('El genero no es valido');
    if (!hos_lad_labor_department) throw new NotFoundException('El departamento no es valido');
    if (!hos_jti_job_title) throw new NotFoundException('El titulo de trabajo no es valido');
    if (!hos_wst_work_status) throw new NotFoundException('El estado de trabajo es valido');
    var boss;
    if (respto.emp_codempboss != null) {
      boss = await this.prisma.hos_emp_employees.findFirst({ where: { emp_code: respto.emp_codempboss } })
      if (!boss) throw new NotFoundException('El jefe inmediato no es valido');
    }
    delete respto.emp_codempboss;
    try {
      var data = {
        emp_birth_date, emp_admission_date, emp_departure_date,
        ...respto,
        emp_codusr: hos_usr_usuario.usr_code,
        emp_codempboss: boss != null ? boss.emp_code : null
      };
      var db = await this.prisma.hos_emp_employees.create({
        data
      });
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.response.message)
    }
    return db;
  }
  async create_discount(createDisountDTO: CreateDisountDTO, hos_usr_usuario: hos_usr_usuario) {
    let { emp_start_date, emp_end_date, ...respto }: any = createDisountDTO;

    emp_start_date = convert_date(emp_start_date);
    emp_end_date = convert_date(emp_end_date);


    const boss = await this.prisma.hos_emp_employees.findFirst({ where: { emp_code: respto.des_codemp } })
    if (!boss) throw new NotFoundException('El empleado no es valido');
    try {
      const db = await this.prisma.hos_des_employee_discounts.create({
        data: {
          emp_start_date,
          emp_end_date,
          ...respto,
          des_codusr: hos_usr_usuario.usr_code
        }
      });
      return db;
    } catch (error) {
      throw new InternalServerErrorException(error.response.message)
    }
  }

  async findAll() {
    return this.prisma.hos_emp_employees.findMany({
      where: { emp_status: 'ACTIVE' },
      select: {
        emp_code: true,
        emp_code_employee: true,
        emp_first_name: true,
        emp_second_name: true,
        emp_third_name: true,
        emp_first_surname: true,
        emp_second_surname: true,
        emp_married_surname: true,
        emp_birth_date: true,
        emp_cel_phone: true,
        hos_gen_genders: {
          select: {
            gen_name: true
          }
        },
        hos_jti_job_title: {
          select: {
            jti_name: true
          }
        },
        hos_lad_labor_department: {
          select: {
            lad_name: true
          }
        },
        hos_wst_work_status: {
          select: {
            wst_name: true
          }
        },
        hos_usr_usuario: {
          select: {
            usr_names: true,
            usr_surnames: true
          }
        },
      }
    });
  }

  async findOne(term: string) {
    let resp = await this.prisma.hos_emp_employees.findFirst({
      where: { emp_code: term, emp_status: 'ACTIVE' },
    });
    if (!resp)
      throw new NotFoundException(`Empleado con el id ${term} no encontrada`);
    return resp;
  }

  async findDiscounts(des_codemp: string) {
    let resp = await this.prisma.hos_des_employee_discounts.findMany({
      where: { des_codemp, des_status: 'ACTIVE' },
      include: { hos_din_discount_institutions: true }
    });
    if (!resp)
      throw new NotFoundException(`Empleado con el id ${des_codemp} no encontrada`);
    return resp;
  }
  async getCatalogs() {
    const [
      hos_gen_genders,
      hos_lad_labor_department,
      hos_jti_job_title,
      hos_wst_work_status,
      hos_din_discount_institutions,
    ] = await Promise.all([
      await this.prisma.hos_gen_genders.findMany({ where: { gen_status: 'ACTIVE' } }),
      await this.prisma.hos_lad_labor_department.findMany({ where: { lad_status: 'ACTIVE' } }),
      await this.prisma.hos_jti_job_title.findMany({ where: { jti_status: 'ACTIVE' } }),
      await this.prisma.hos_wst_work_status.findMany({ where: { wst_status: 'ACTIVE' } }),
      await this.prisma.hos_din_discount_institutions.findMany({ where: { din_status: 'ACTIVE' } }),
    ]);
    return {
      hos_gen_genders,
      hos_lad_labor_department,
      hos_jti_job_title,
      hos_wst_work_status,
      hos_din_discount_institutions,
    };
  }
  async update(id: string, updateEmployeeDto: UpdateEmployeeDto, hos_usr_usuario: hos_usr_usuario) {
    await this.findOne(id);
    var { emp_birth_date, emp_admission_date, emp_departure_date, ...respto }: any = updateEmployeeDto;
    emp_birth_date = convert_date(emp_birth_date);
    emp_admission_date = convert_date(emp_admission_date);
    emp_departure_date = convert_date(emp_departure_date);
    const [
      hos_gen_genders,
      hos_lad_labor_department,
      hos_jti_job_title,
      hos_wst_work_status,
    ] = await Promise.all([
      await this.prisma.hos_gen_genders.findFirst({ where: { gen_code: respto.emp_codgen } }),
      await this.prisma.hos_lad_labor_department.findFirst({ where: { lad_code: respto.emp_codlad } }),
      await this.prisma.hos_jti_job_title.findFirst({ where: { jti_code: respto.emp_codjti } }),
      await this.prisma.hos_wst_work_status.findFirst({ where: { wst_code: respto.emp_codws } }),
    ]);
    if (!hos_gen_genders) throw new NotFoundException('El genero no es valido');
    if (!hos_lad_labor_department) throw new NotFoundException('El departamento no es valido');
    if (!hos_jti_job_title) throw new NotFoundException('El titulo de trabajo no es valido');
    if (!hos_wst_work_status) throw new NotFoundException('El estado de trabajo es valido');
    var boss;
    if (respto.emp_codempboss != null) {
      boss = await this.prisma.hos_emp_employees.findFirst({ where: { emp_code: respto.emp_codempboss } })
      if (!boss) throw new NotFoundException('El jefe inmediato no es valido');
    }
    delete respto.emp_codempboss;
    try {
      var data = {
        emp_birth_date,
        emp_admission_date,
        emp_departure_date,
        ...respto,
        emp_codusr: hos_usr_usuario.usr_code,
        emp_codempboss: boss != null ? boss.emp_code : null
      };
      var db = await this.prisma.hos_emp_employees.update({
        where: {
          emp_code: id
        },
        data
      });
    } catch (error) {
      throw new InternalServerErrorException(error.response.message)
    }
    return db;
  }

  async remove(id: string) {
    const resp = await this.findOne(id);
    await this.prisma.hos_emp_employees.update({
      where: { emp_code: resp.emp_code },
      data: { emp_status: 'INACTIVE' },
    });
  }
  async removeDiscounts(id: string) {
    let resp = await this.prisma.hos_des_employee_discounts.findFirst({
      where: { des_code: id, des_status: 'ACTIVE' },
    });
    if (!resp)
      throw new NotFoundException(`Descuento con el id ${id} no encontrado`);
    await this.prisma.hos_des_employee_discounts.update({
      where: { des_code: id, des_status: 'ACTIVE' },
      data: { des_status: 'CANCELED' },
    });
  }
}
