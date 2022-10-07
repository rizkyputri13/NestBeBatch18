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
import { Departments } from '../../entities/Departments';
import { Repository } from 'typeorm';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('api/department/')
@Injectable()
export class DepControll {
  constructor(
    @InjectRepository(Departments) private DepRepo: Repository<Departments>,
  ) {}

  @Get()
  public async GetAll() {
    try {
      const department = await this.DepRepo.find();
      return department;
    } catch (error) {
      return error.message;
    }
  }

  @Get(':id')
  public async GetOne(@Param('id') id: number) {
    try {
      const department = await this.DepRepo.findOne({
        where: { departmentId: id },
      });
      return department;
    } catch (error) {
      return error.message;
    }
  }
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'foto' }, { name: 'file' }]))
  public async Create(@UploadedFiles() file: any, @Body() fields: any) {
    try {
      if (file) {
        const department = await this.DepRepo.save({
          departmentName: fields.departmentName,
          departmentPhoto: file.file ? file.file[0].originalname : null,
          departmentFile: file.foto ? file.foto[0].originalname : null,
        });
        return department;
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
        await this.DepRepo.update(id, {
          departmentName: fields.departmentName,
          // departmentPhoto: file.file ? file.file[0].originalname : null,
          // departmentFile: file.foto ? file.foto[0].originalname : null,
        });
        return await this.DepRepo.findOne({ where: { departmentId: id } });
      }
    } catch (error) {
      return error.message;
    }
  }
  @Delete(':id')
  public async Deleted(@Param('id') id: number) {
    try {
      const department = await this.DepRepo.delete(id);
      return 'Delete' + department.affected + 'rows';
    } catch (error) {
      return error.message;
    }
  }
}
