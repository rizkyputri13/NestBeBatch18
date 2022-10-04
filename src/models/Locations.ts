import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Departments } from './Departments';
import { Countries } from './Countries';

@Index('locations_pkey', ['locationId'], { unique: true })
@Entity('locations', { schema: 'public' })
export class Locations {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'location_id' })
  locationId: number;

  @Column('character varying', {
    name: 'street_address',
    nullable: true,
    length: 40,
  })
  streetAddress: string | null;

  @Column('character varying', {
    name: 'postal_code',
    nullable: true,
    length: 11,
  })
  postalCode: string | null;

  @Column('character varying', { name: 'city', nullable: true, length: 19 })
  city: string | null;

  @Column('character varying', {
    name: 'state_province',
    nullable: true,
    length: 17,
  })
  stateProvince: string | null;

  @OneToMany(() => Departments, (departments) => departments.location)
  departments: Departments[];

  @ManyToOne(() => Countries, (countries) => countries.locations, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'country_id', referencedColumnName: 'countryId' }])
  country: Countries;
}
