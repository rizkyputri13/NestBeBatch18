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
import { Regions } from '../../entities/Regions';
import { Repository } from 'typeorm';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('api/region/')
@Injectable()
export class RegControll {
  constructor(
    @InjectRepository(Regions) private RegRepo: Repository<Regions>,
  ) {}

  @Get()
  public async GetAll() {
    try {
      const region = await this.RegRepo.find();
      return region;
    } catch (error) {
      return error.message;
    }
  }

  @Get(':id')
  public async GetOne(@Param('id') id: number) {
    try {
      const region = await this.RegRepo.findOne({ where: { regionId: id } });
      return region;
    } catch (error) {
      return error.message;
    }
  }
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'foto' }, { name: 'file' }]))
  public async Create(@UploadedFiles() file: any, @Body() fields: any) {
    try {
      if (file) {
        const region = await this.RegRepo.save({
          regionName: fields.regionName,
          regionPhoto: file.file ? file.file[0].originalname : null,
          regionFile: file.foto ? file.foto[0].originalname : null,
        });
        return region;
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
        await this.RegRepo.update(id, {
          regionName: fields.regionName,
          regionPhoto: file.file ? file.file[0].originalname : null,
          regionFile: file.foto ? file.foto[0].originalname : null,
        });
        return await this.RegRepo.findOne({ where: { regionId: id } });
      }
    } catch (error) {
      return error.message;
    }
  }
  @Delete(':id')
  public async Deleted(@Param('id') id: number) {
    try {
      const region = await this.RegRepo.delete(id);
      return 'Delete' + region.affected + 'rows';
    } catch (error) {
      return error.message;
    }
  }
}
