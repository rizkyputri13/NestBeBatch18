import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Regions } from '../../entities/Regions';
import { RegionDto } from '../Dto/region-dto';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Regions) private tasksRepo: Repository<Regions>,
  ) {}
  public async findAll() {
    return await this.tasksRepo.find();
  }

  public async findOne(id) {
    return await this.tasksRepo.findOne({ where: { regionId: id } });
  }
  public async create(body) {
    const newTask = await this.tasksRepo.create({
      regionName: body.regionName,
      regionPhoto: body.regionPhoto,
      regionFile: body.regionFile,
    });
    return this.tasksRepo.save(newTask);
  }
  public async update(id, body) {
    const region = await this.tasksRepo.update(id, { ...body });
    return region;
  }
  public async delete(id) {
    await this.tasksRepo.delete(id);
    return true;
  }
}
