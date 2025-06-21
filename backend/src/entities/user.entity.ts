import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { TodoEntity } from '../modules/to_do/todo.entity';
import { ProfileEntity } from './profile.entity';
import { TenantEntity } from './tenant.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @ManyToMany(() => TodoEntity, (todo) => todo.users)
  @JoinTable()
  todos: TodoEntity[];

  @OneToOne(() => ProfileEntity, (profile) => profile.user, { cascade: true })
  @JoinColumn()
  profile: ProfileEntity;

  @ManyToOne(() => TenantEntity)
  tenant: TenantEntity;

  @Column()
  tenantId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
