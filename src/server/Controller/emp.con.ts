import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employees } from '../../entities/Employees';
import { Repository } from 'typeorm';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('api/employee/')
@Injectable()
export class EmpControll {
  constructor(
    @InjectRepository(Employees) private EmpRepo: Repository<Employees>,
  ) {}

  @Get()
  public async GetAll() {
    try {
      const employee = await this.EmpRepo.find();
      return employee;
    } catch (error) {
      return error.message;
    }
  }

  @Get(':id')
  public async GetOne(@Param('id') id: number) {
    try {
      const employee = await this.EmpRepo.findOne({
        where: { employeeId: id },
      });
      return employee;
    } catch (error) {
      return error.message;
    }
  }
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'foto' }, { name: 'file' }]))
  public async Create(@UploadedFiles() file: any, @Body() fields: any) {
    try {
      if (file) {
        const employee = await this.EmpRepo.save({
          firstName: fields.firstName,
          lastName: fields.lastName,
          email: fields.email,
          phoneNumber: fields.phoneNumber,
          hireDate: fields.hireDate,
          salary: fields.salary,
          commissionPct: fields.commissionPct,
          // employeePhoto: file.file ? file.file[0].originalname : null,
          // employeeFile: file.foto ? file.foto[0].originalname : null,
        });
        return employee;
      }
    } catch (error) {
      return error.message;
    }
  }
  @Put(':id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'foto' }, { name: 'file' }]))
  public async Updated(
    @UploadedFiles() file: any,
    @Body() fields: any,
    @Param('id') id: number,
  ) {
    try {
      if (file) {
        await this.EmpRepo.update(id, {
          firstName: fields.firstName,
          lastName: fields.lastName,
          email: fields.email,
          phoneNumber: fields.phoneNumber,
          hireDate: fields.hireDate,
          salary: fields.salary,
          commissionPct: fields.commissionPct,
          // employeePhoto: file.file ? file.file[0].originalname : null,
          // employeeFile: file.foto ? file.foto[0].originalname : null,
        });
        return await this.EmpRepo.findOne({ where: { employeeId: id } });
      }
    } catch (error) {
      return error.message;
    }
  }
  @Delete(':id')
  public async Deleted(@Param('id') id: number) {
    try {
      const employee = await this.EmpRepo.delete(id);
      return 'Delete' + employee.affected + 'rows';
    } catch (error) {
      return error.message;
    }
  }
}
