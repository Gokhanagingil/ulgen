import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany } from 'typeorm';
import { TenantEntity } from '../../entities/tenant.entity';
import { UserEntity } from '../../entities/user.entity';

@Entity('todos')
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  tenantId: number;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.todos)
  tenant: TenantEntity;

  @ManyToMany(() => UserEntity, (user) => user.todos)
  users: UserEntity[];

  @Column({ default: false })
  completed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
