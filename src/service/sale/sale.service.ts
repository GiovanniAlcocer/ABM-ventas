import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SaleDto } from 'src/dto/sale.dto';
import { SaleEntity } from 'src/persistence/entities/sale.entity';
import { SaleDetailEntity } from 'src/persistence/entities/saleDetail.entity';
import { AppDataSource } from 'src/data-source';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaleIdDto } from '../../dto/saleId.dto';
import { DetailIdDto } from '../../dto/detailId.dto';
import { IdDetailDto } from '../../dto/idDetail.dto';

@Injectable()
export class SaleService {
  detailRepo: any;
  constructor(
    @InjectRepository(SaleEntity, 'postgres')
    private saleRepository: Repository<SaleEntity>,
    @InjectRepository(SaleDetailEntity, 'postgres')
    private detailRepository: Repository<SaleDetailEntity>,
  ) {}

  public async getAllSales() {
    const result = await this.saleRepository.find();
    console.log(result);
    return result;
  }

  public async getAllDetails() {
    const result = await this.detailRepository.find();
    console.log(result);
    return result;
  }

  public async deleteDetail(id: IdDetailDto) {
    const result = await this.detailRepository.delete({ id: id.id });
    return result;
  }

  public async deleteSale(id: IdDetailDto) {
    const result = await this.saleRepository.delete({ id: id.id });
    return result;
  }

  async saveSale(saleDto: SaleDto) {
    let newDetails: Array<SaleDetailEntity> = new Array<SaleDetailEntity>();
    const newSale: SaleEntity = new SaleEntity();

    newSale.clientCi = saleDto.clientCi;
    newSale.clientCode = saleDto.clientCode;
    newSale.clientName = saleDto.clientName;
    newSale.date = new Date();

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(newSale).then(() => {
        newDetails = saleDto.details.map((detail) => {
          const saleDetail = new SaleDetailEntity();
          saleDetail.code = detail.code;
          saleDetail.description = detail.description;
          saleDetail.quantity = detail.quantity;
          saleDetail.unitPrice = detail.unitPrice;
          saleDetail.sale = newSale;
          return saleDetail;
        });
      });
      await queryRunner.manager.save(newDetails);
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'Hubo un problema',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }

  public async updateSale(salDto: SaleIdDto) {
    const newSale: SaleEntity = new SaleEntity();

    newSale.id = salDto.sale_id;
    newSale.clientCi = salDto.clientCi;
    newSale.clientCode = salDto.clientCode;
    newSale.clientName = salDto.clientName;

    console.log(newSale);
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.getRepository(SaleEntity).save(newSale);
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      console.log(err);

      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  public async updateDetail(detailDto: DetailIdDto) {
    const detailData: SaleDetailEntity = new SaleDetailEntity();

    detailData.id = detailDto.id;
    detailData.code = detailDto.code;
    detailData.quantity = detailDto.quantity;
    detailData.description = detailDto.description;
    detailData.unitPrice = detailDto.unitPrice;

    console.log(detailData);
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager
        .getRepository(SaleDetailEntity)
        .save(detailData);
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      console.log(err);

      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }
}
