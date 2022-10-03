import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Regions } from '../entities/Regions';
import { Countries } from '../entities/Countries';
import { RegionController } from './Controller/region.controller';
import { RegionsService } from './Service/region.service';

@Module({
  imports: [TypeOrmModule.forFeature([Regions, Countries])],
  providers: [RegionsService],
  controllers: [RegionController],
})
export class ServerModule {}
