import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SaleDto } from 'src/dto/sale.dto';
import { SaleEntity } from 'src/persistence/entities/sale.entity';
import { SaleDetailEntity } from 'src/persistence/entities/saleDetail.entity';
import { AppDataSource } from 'src/data-source';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaleIdDto } from '../../dto/saleId.dto';
import { DetailIdDto } from '../../dto/detailId.dto';
import { PageDto } from '../../dto/page.dto';

@Injectable()
export class SaleService {
  detailRepo: any;
  constructor(
    @InjectRepository(SaleEntity, 'postgres')
    private saleRepository: Repository<SaleEntity>,
    @InjectRepository(SaleDetailEntity, 'postgres')
    private detailRepository: Repository<SaleDetailEntity>,
  ) {}

  public async getSaleCount() {
    return this.saleRepository.createQueryBuilder('sale').getCount();
  }

  public async getAllPaginated(settings: PageDto) {
    const name = settings.name;
    const queryBuilder = this.saleRepository.createQueryBuilder('sale');
    queryBuilder
      .leftJoinAndSelect('sale.details', 'detail')
      .where('sale.client_name LIKE :name', { name })
      .orderBy('sale.clientName', 'ASC')
      .skip(settings.take * (settings.page - 1))
      .take(settings.take);
    const { entities } = await queryBuilder.getRawAndEntities();
    return entities;
  }

  public async getAllSales() {
    const result = await this.saleRepository.find();
    return result;
  }

  public async getDetailsBySale(saleId: string) {
    const sale = await this.saleRepository.findOneBy({
      id: saleId,
    });
    const detailsOfSale = await this.detailRepository.findBy({ sale });
    /* const sale2 = await this.saleRepository
      .createQueryBuilder('sale')
      .leftJoinAndSelect('sale.details', 'detail')
      .where('sale.id = :id', { id: saleId })
      .getOne(); */
    return detailsOfSale;
  }

  public async getAllDetails() {
    const result = await this.detailRepository.find();
    return result;
  }

  public async deleteDetail(id: string) {
    const result = await this.detailRepository.delete({ id: id });
    return result;
  }

  public async deleteSale(id: string) {
    const result = await this.saleRepository.delete({ id: id });
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
      throw new HttpException(
        'Hubo un problema',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
      throw new HttpException(
        'Hubo un problema',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  public async updateDetail2(detailDto: DetailIdDto) {
    const detailData: SaleDetailEntity = new SaleDetailEntity();

    detailData.id = detailDto.id;
    detailData.code = detailDto.code;
    detailData.quantity = detailDto.quantity;
    detailData.description = detailDto.description;
    detailData.unitPrice = detailDto.unitPrice;

    console.log(detailData);
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.manager.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager
          .getRepository(SaleDetailEntity)
          .save(detailData);
      },
    );
  }
}
