import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { SaleDetailEntity } from "./saleDetail.entity"

@Entity({name: 'sale'})
export class SaleEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'sale_id' })
    id: string;

    @Column()
    clientName: string

    @Column()
    clientCode: string

    @Column()
    date: Date

    @Column()
    clientCi: string

    @OneToMany(() => SaleDetailEntity, (detail) => detail.sale)
    details: SaleDetailEntity[]
}