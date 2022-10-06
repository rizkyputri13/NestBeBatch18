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
import { Countries } from '../../entities/Countries';
import { Repository } from 'typeorm';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('api/country/')
@Injectable()
export class CtrControll {
  constructor(
    @InjectRepository(Countries) private CtrRepo: Repository<Countries>,
  ) {}

  @Get()
  public async GetAll() {
    try {
      const country = await this.CtrRepo.find();
      return country;
    } catch (error) {
      return error.message;
    }
  }

  @Get(':id')
  public async GetOne(@Param('id') id: number) {
    try {
      const country = await this.CtrRepo.findOne({ where: { countryId: id } });
      return country;
    } catch (error) {
      return error.message;
    }
  }
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'foto' }, { name: 'file' }]))
  public async Create(@UploadedFiles() file: any, @Body() fields: any) {
    try {
      if (file) {
        const country = await this.CtrRepo.save({
          countryName: fields.countryName,
          countryPhoto: file.file ? file.file[0].originalname : null,
          countryFile: file.foto ? file.foto[0].originalname : null,
        });
        return country;
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
        await this.CtrRepo.update(id, {
          countryName: fields.countryName,
          countryPhoto: file.file ? file.file[0].originalname : null,
          countryFile: file.foto ? file.foto[0].originalname : null,
        });
        return await this.CtrRepo.findOne({ where: { countryId: id } });
      }
    } catch (error) {
      return error.message;
    }
  }
  @Delete(':id')
  public async Deleted(@Param('id') id: number) {
    try {
      const country = await this.CtrRepo.delete(id);
      return 'Delete' + country.affected + 'rows';
    } catch (error) {
      return error.message;
    }
  }
}
