import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/service/service.module';
import { SaleController } from './sale/sale.controller';

@Module({
    imports: [ ServiceModule],
    controllers: [SaleController]
  })
  export class ControllerModule {}