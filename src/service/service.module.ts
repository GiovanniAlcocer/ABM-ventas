import { Module } from '@nestjs/common';
import { SaleEntity } from 'src/persistence/entities/sale.entity';
import { SaleService } from './sale/sale.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleDetailEntity } from 'src/persistence/entities/saleDetail.entity';
import { Connection } from 'typeorm';

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
