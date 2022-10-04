import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('users_pkey', ['userId'], { unique: true })
@Entity('users', { schema: 'public' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'user_id' })
  userId: number;

  @Column('character varying', {
    name: 'user_name',
    nullable: true,
    length: 255,
  })
  userName: string | null;

  @Column('character varying', {
    name: 'user_email',
    nullable: true,
    length: 255,
  })
  userEmail: string | null;

  @Column('character varying', {
    name: 'user_password',
    nullable: true,
    length: 255,
  })
  userPassword: string | null;
}
