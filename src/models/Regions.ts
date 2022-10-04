import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Countries } from './Countries';

@Index('regions_pkey', ['regionId'], { unique: true })
@Entity('regions', { schema: 'public' })
export class Regions {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'region_id' })
  regionId: number;

  @Column('character varying', {
    name: 'region_name',
    nullable: true,
    length: 22,
  })
  regionName: string | null;

  @Column('character varying', {
    name: 'region_photo',
    nullable: true,
    length: 255,
  })
  regionPhoto: string | null;

  @Column('character varying', {
    name: 'region_file',
    nullable: true,
    length: 255,
  })
  regionFile: string | null;

  @OneToMany(() => Countries, (countries) => countries.region)
  countries: Countries[];
}
