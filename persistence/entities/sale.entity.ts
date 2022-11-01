import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { SaleDetailEntity } from "./saleDetail.entity"


@Entity('sale')
export class SaleEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    clientName: string

    @Column()
    clientCode: string

    @Column()
    date: string

    @Column()
    clientCi: string

    @OneToMany(() => SaleDetailEntity, (detail) => detail.sale)
    details: SaleDetailEntity[]
}