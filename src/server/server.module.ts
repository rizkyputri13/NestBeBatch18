import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Regions } from '../entities/Regions';
import { Countries } from '../entities/Countries';
import { MulterModule } from '@nestjs/platform-express';
import { RegControll } from './Controller/reg.con';
import { CtrControll } from './Controller/ctr.con';
import { ConfigMulter } from './Middleware/multer.conf';

@Module({
  imports: [
    TypeOrmModule.forFeature([Regions, Countries]),
    MulterModule.register(ConfigMulter.UploadFiles()),
  ],
  providers: [],
  controllers: [RegControll, CtrControll],
})
export class ServerModule {}
