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
import { Jobs } from '../../entities/Jobs';
import { Repository } from 'typeorm';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('api/job/')
@Injectable()
export class JobControll {
  constructor(@InjectRepository(Jobs) private JobRepo: Repository<Jobs>) {}

  @Get()
  public async GetAll() {
    try {
      const job = await this.JobRepo.find();
      return job;
    } catch (error) {
      return error.message;
    }
  }

  @Get(':id')
  public async GetOne(@Param('id') id: number) {
    try {
      const job = await this.JobRepo.findOne({ where: { jobId: id } });
      return job;
    } catch (error) {
      return error.message;
    }
  }
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'foto' }, { name: 'file' }]))
  public async Create(@UploadedFiles() file: any, @Body() fields: any) {
    try {
      if (file) {
        const job = await this.JobRepo.save({
          jobTitle: fields.jobTitle,
          minSalary: fields.minSalary,
          maxSalary: fields.maxSalary,
          // jobPhoto: file.file ? file.file[0].originalname : null,
          // jobFile: file.foto ? file.foto[0].originalname : null,
        });
        return job;
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
        await this.JobRepo.update(id, {
          jobTitle: fields.jobTitle,
          minSalary: fields.minSalary,
          maxSalary: fields.maxSalary,
          // jobPhoto: file.file ? file.file[0].originalname : null,
          // jobFile: file.foto ? file.foto[0].originalname : null,
        });
        return await this.JobRepo.findOne({ where: { jobId: id } });
      }
    } catch (error) {
      return error.message;
    }
  }
  @Delete(':id')
  public async Deleted(@Param('id') id: number) {
    try {
      const job = await this.JobRepo.delete(id);
      return 'Delete' + job.affected + 'rows';
    } catch (error) {
      return error.message;
    }
  }
}
