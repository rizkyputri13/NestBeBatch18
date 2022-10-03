import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Employees } from './Employees';
import { JobHistory } from './JobHistory';

@Index('jobs_pkey', ['jobId'], { unique: true })
@Entity('jobs', { schema: 'public' })
export class Jobs {
  @Column('character varying', { primary: true, name: 'job_id', length: 10 })
  jobId: string;

  @Column('character varying', {
    name: 'job_title',
    nullable: true,
    length: 31,
  })
  jobTitle: string | null;

  @Column('numeric', {
    name: 'min_salary',
    nullable: true,
    precision: 7,
    scale: 2,
  })
  minSalary: string | null;

  @Column('numeric', {
    name: 'max_salary',
    nullable: true,
    precision: 7,
    scale: 2,
  })
  maxSalary: string | null;

  @OneToMany(() => Employees, (employees) => employees.job)
  employees: Employees[];

  @OneToMany(() => JobHistory, (jobHistory) => jobHistory.job)
  jobHistories: JobHistory[];
}
