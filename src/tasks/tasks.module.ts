import { Module } from '@nestjs/common';
import { TasksService } from './services/tasks.service';
import { TasksController } from './controllers/tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Regions } from '../models/Regions';
import { Countries } from '../models/Countries';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigMulter } from '../middleware/multer.config';
@Module({
  imports: [
    TypeOrmModule.forFeature([Regions, Countries]),
    MulterModule.register(ConfigMulter.UploadFiles()),
  ],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
