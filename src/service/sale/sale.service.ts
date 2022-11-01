import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleEntity } from 'src/persistence/entities/sale.entity';
import { SaleDetailEntity } from 'src/persistence/entities/saleDetail.entity';

import { Repository } from 'typeorm';

@Injectable()
export class SaleService {
    constructor(
        @InjectRepository(SaleEntity, 'postgres')
        private saleRepository: Repository<SaleEntity>,
        @InjectRepository(SaleDetailEntity, 'postgres')
        private detailRepository: Repository<SaleEntity>,
      ) {}

}
