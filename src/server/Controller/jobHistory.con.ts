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
import { JobHistory } from '../../entities/JobHistory';
import { Repository } from 'typeorm';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('api/jobHistory/')
@Injectable()
export class JobHistoryControll {
  constructor(
    @InjectRepository(JobHistory)
    private JobHistoryRepo: Repository<JobHistory>,
  ) {}

  @Get()
  public async GetAll() {
    try {
      const jobHistory = await this.JobHistoryRepo.find();
      return jobHistory;
    } catch (error) {
      return error.message;
    }
  }

  @Get(':id')
  public async GetOne(@Param('id') id: number) {
    try {
      const jobHistory = await this.JobHistoryRepo.findOne({
        where: { EmployeeId: id },
      });
      return jobHistory;
    } catch (error) {
      return error.message;
    }
  }
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'foto' }, { name: 'file' }]))
  public async Create(@UploadedFiles() file: any, @Body() fields: any) {
    try {
      if (file) {
        const jobHistory = await this.JobHistoryRepo.save({
          employeeId: fields.employeeId,
          startDate: fields.startDate,
          endDate: fields.endDate,
          // jobPhoto: file.file ? file.file[0].originalname : null,
          // jobFile: file.foto ? file.foto[0].originalname : null,
        });
        return jobHistory;
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
        await this.JobHistoryRepo.update(id, {
          employeeId: fields.employeeId,
          startDate: fields.startDate,
          endDate: fields.endDate,
          // jobPhoto: file.file ? file.file[0].originalname : null,
          // jobFile: file.foto ? file.foto[0].originalname : null,
        });
        return await this.JobHistoryRepo.findOne({ where: { EmployeeId: id } });
      }
    } catch (error) {
      return error.message;
    }
  }
  @Delete(':id')
  public async Deleted(@Param('id') id: number) {
    try {
      const jobHistory = await this.JobHistoryRepo.delete(id);
      return 'Delete' + jobHistory.affected + 'rows';
    } catch (error) {
      return error.message;
    }
  }
}
