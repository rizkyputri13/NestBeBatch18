import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Regions } from '../entities/Regions';
import { Countries } from '../entities/Countries';
import { MulterModule } from '@nestjs/platform-express';
import { RegControll } from './Controller/reg.con';
import { CtrControll } from './Controller/ctr.con';
import { DepControll } from './Controller/dep.con';
import { EmpControll } from './Controller/emp.con';
import { JobControll } from './Controller/job.con';
import { JobHistoryControll } from './Controller/jobHistory.con';
import { LocControll } from './Controller/loc.con';
import { ConfigMulter } from './Middleware/multer.conf';

@Module({
  imports: [
    TypeOrmModule.forFeature([Regions, Countries]),
    MulterModule.register(ConfigMulter.UploadFiles()),
  ],
  providers: [],
  controllers: [
    RegControll,
    CtrControll,
    LocControll,
    DepControll,
    EmpControll,
    JobControll,
    JobHistoryControll,
  ],
})
export class ServerModule {}
