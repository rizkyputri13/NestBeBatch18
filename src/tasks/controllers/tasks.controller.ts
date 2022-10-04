import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { TasksService } from './../services/tasks.service';
@Controller('api/region')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  public async getAll() {
    return await this.taskService.findAll();
  }

  @Get(':id')
  public async getOne(@Param('id') id: number) {
    return await this.taskService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'foto' }, { name: 'file' }]))
  public async create(@UploadedFiles() file: any, @Body() fields: any) {
    return this.taskService.create(file, fields);
  }

  @Put(':id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'foto' }, { name: 'file' }]))
  public async update(
    @Param('id') id: number,
    @UploadedFiles() file: any,
    @Body() fields: any,
  ) {
    return this.taskService.update(id, file, fields);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return this.taskService.delete(id);
  }
}
