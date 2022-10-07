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
import { Locations } from '../../entities/Locations';
import { Repository } from 'typeorm';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('api/location/')
@Injectable()
export class LocControll {
  constructor(
    @InjectRepository(Locations) private LocRepo: Repository<Locations>,
  ) {}

  @Get()
  public async GetAll() {
    try {
      const location = await this.LocRepo.find();
      return location;
    } catch (error) {
      return error.message;
    }
  }

  @Get(':id')
  public async GetOne(@Param('id') id: number) {
    try {
      const location = await this.LocRepo.findOne({
        where: { locationId: id },
      });
      return location;
    } catch (error) {
      return error.message;
    }
  }
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'foto' }, { name: 'file' }]))
  public async Create(@UploadedFiles() file: any, @Body() fields: any) {
    try {
      if (file) {
        const location = await this.LocRepo.save({
          streetAddress: fields.streetAddress,
          postalCode: fields.postalCode,
          city: fields.city,
          stateProvince: fields.stateProvince,
          //countryId: fields.countryId,
          // locationPhoto: file.file ? file.file[0].originalname : null,
          // locationFile: file.foto ? file.foto[0].originalname : null,
        });
        return location;
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
        await this.LocRepo.update(id, {
          streetAddress: fields.streetAddress,
          postalCode: fields.postalCode,
          city: fields.city,
          stateProvince: fields.stateProvince,
          //countryId: fields.countryId,
          // locationPhoto: file.file ? file.file[0].originalname : null,
          // locationFile: file.foto ? file.foto[0].originalname : null,
        });
        return await this.LocRepo.findOne({ where: { locationId: id } });
      }
    } catch (error) {
      return error.message;
    }
  }
  @Delete(':id')
  public async Deleted(@Param('id') id: number) {
    try {
      const location = await this.LocRepo.delete(id);
      return 'Delete' + location.affected + 'rows';
    } catch (error) {
      return error.message;
    }
  }
}
