import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleDto } from 'src/dto/sale.dto';
import { SaleEntity } from 'src/persistence/entities/sale.entity';
import { SaleDetailEntity } from 'src/persistence/entities/saleDetail.entity';
import { AppDataSource } from "src/data-source"
import { Connection, getConnection, Repository } from 'typeorm';

@Injectable()
export class SaleService {
  constructor(

  ) { }

  async saveSale(saleDto: SaleDto) {
    let newDetails: Array<SaleDetailEntity> = new Array<SaleDetailEntity>
    let newSale: SaleEntity = new SaleEntity()

    newSale.clientCi = saleDto.clientCi;
    newSale.clientCode = saleDto.clientCode;
    newSale.clientName = saleDto.clientName;
    newSale.date = new Date();

    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(newSale).then( () => {
        newDetails = saleDto.details.map(detail => {
          let saleDetail = new SaleDetailEntity()
          saleDetail.code = detail.code;
          saleDetail.description = detail.description;
          saleDetail.quantity = detail.quantity;
          saleDetail.unitPrice = detail.unitPrice;
          saleDetail.sale = newSale
          return saleDetail;
          });
        }
      );
      await queryRunner.manager.save(newDetails);
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw new HttpException("Hubo un problema", HttpStatus.INTERNAL_SERVER_ERROR)
    } finally {
      await queryRunner.release();
    }

  }
}
