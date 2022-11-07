import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SaleEntity } from './sale.entity';

@Entity({ name: 'detail' })
export class SaleDetailEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'detail_id' })
  id: string;

  @Column()
  code: string;

  @Column()
  quantity: number;

  @Column()
  description: string;

  @Column({ name: 'unit_price', type: 'double precision' })
  unitPrice: number;

  @ManyToOne(() => SaleEntity, (sale) => sale.details, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'sale_id' })
  sale: SaleEntity;
}
