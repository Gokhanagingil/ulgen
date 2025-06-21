import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('profiles')
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bio: string;

  @OneToOne(() => UserEntity, (user) => user.profile)
  user: UserEntity;
}
