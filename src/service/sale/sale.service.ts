import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleDto } from 'src/dto/sale.dto';
import { SaleEntity } from 'src/persistence/entities/sale.entity';
import { SaleDetailEntity } from 'src/persistence/entities/saleDetail.entity';
import { AppDataSource } from "src/data-source"
import { Connection, getConnection, Repository } from 'typeorm';

@Injectable()
export class SaleService {
  constructor(
    /* @InjectRepository(SaleEntity, 'postgres')
    private saleRepository: Repository<SaleEntity>,
    @InjectRepository(SaleDetailEntity, 'postgres')
    private detailRepository: Repository<SaleEntity>, */

  ) { }

  async saveSale(saleDto: SaleDto) {


    const { details, ...sale } = saleDto;
    const detalle: SaleDetailEntity = new SaleDetailEntity()
    const venta: SaleEntity = new SaleEntity()

    detalle.code = ''
    detalle.description =''
    detalle.quantity = 2
    detalle.unitPrice = 2.2


    venta.clientCi = '441'
    venta.clientCode = '446'
    venta.clientName = 'marcelo'
    venta.date = new Date()
    
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(detalle);
      venta.details.push(detalle)
      await queryRunner.manager.save(venta);
  
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }

    console.log('details we:', details);
    console.log('sale info we:', sale);

  }

  async getAllSales() {
    return ''/* this.saleRepository.find(); */
  }
}
