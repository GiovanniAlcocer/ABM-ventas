import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { SaleEntity } from "./sale.entity"

@Entity()
export class SaleDetailEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'detail_id' })
    id: string;

    @Column()
    code: string

    @Column()
    quantity: number

    @Column()
    description: string

    @Column()
    unitPrice: number

    @ManyToOne(() => SaleEntity, (sale) => sale.details)
    sale: SaleEntity 
}