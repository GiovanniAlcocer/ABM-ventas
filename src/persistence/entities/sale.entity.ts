import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SaleDetailEntity } from './saleDetail.entity';

@Entity({ name: 'sale' })
export class SaleEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'sale_id' })
  id: string;

  @Column({ name: 'client_name' })
  clientName: string;

  @Column({ name: 'client_code' })
  clientCode: string;

  @Column()
  date: Date;

  @Column({ name: 'client_ci' })
  clientCi: string;

  @OneToMany(() => SaleDetailEntity, (detail) => detail.sale, {
    cascade: ['remove'],
  })
  details: SaleDetailEntity[];
}
