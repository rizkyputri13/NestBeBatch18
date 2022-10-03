import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RegionsService } from '../Service/region.service';
import { RegionDto } from '../Dto/region-dto';
@Controller('api/region')
export class RegionController {
  constructor(private taskService: RegionsService) {}
  @Get()
  public async getAll() {
    return await this.taskService.findAll();
  }

  @Get(':id')
  public async getOne(@Param('id') id: number) {
    return await this.taskService.findOne(id);
  }

  @Post()
  public async create(@Body() body: RegionDto) {
    return await this.taskService.create(body);
  }

  @Put(':id')
  public async update(@Param('id') id: number, @Body() body: RegionDto) {
    return this.taskService.update(id, body);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return this.taskService.delete(id);
  }
}
