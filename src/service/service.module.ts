import { Module } from '@nestjs/common';
import { SaleDetailEntity } from 'src/persistence/saleDetail.entity';
import { SaleEntity } from 'src/persistence/sale.entity';
import { SaleService } from './sale/sale.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
      TypeOrmModule.forFeature(
        [SaleDetailEntity, SaleEntity],
        'postgres',
      ),
    ],
    providers: [
      SaleService
    ],
    exports: [
        SaleService
    ],
  })
  export class ServiceModule { }
  