import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Regions } from './Regions';
import { Locations } from './Locations';

@Index('countries_pkey', ['countryId'], { unique: true })
@Entity('countries', { schema: 'public' })
export class Countries {
  @Column('character varying', { primary: true, name: 'country_id', length: 2 })
  countryId: number;

  @Column('character varying', {
    name: 'country_name',
    nullable: true,
    length: 24,
  })
  countryName: string | null;
  @Column('character varying', {
    name: 'country_photo',
    nullable: true,
    length: 255,
  })
  countryPhoto: string | null;

  @Column('character varying', {
    name: 'country_file',
    nullable: true,
    length: 255,
  })
  countryFile: string | null;

  @ManyToOne(() => Regions, (regions) => regions.countries, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'region_id', referencedColumnName: 'regionId' }])
  region: Regions;

  @OneToMany(() => Locations, (locations) => locations.country)
  locations: Locations[];
}
