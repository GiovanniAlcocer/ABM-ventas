import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/service/service.module';
import { SaleController } from './sale/sale.controller';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [ServiceModule],
  controllers: [SaleController, AuthController],
})
export class ControllerModule {}
