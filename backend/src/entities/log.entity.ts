import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  method: string;

  @Column()
  path: string;

  @Column({ nullable: true })
  userId: number;

  @Column({ nullable: true })
  tenantId: number;

  @Column()
  timestamp: Date;
}
