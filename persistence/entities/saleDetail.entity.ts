import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import { SaleEntity } from "./sale.entity"


@Entity('sale_detail')
export class SaleDetailEntity {
    @PrimaryGeneratedColumn()
    id: string

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