import { Module } from '@nestjs/common';
import { SaleEntity } from 'src/persistence/entities/sale.entity';
import { SaleService } from './sale/sale.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleDetailEntity } from 'src/persistence/entities/saleDetail.entity';
import { AuthService } from './auth/auth.service';
import { UserEntity } from 'src/persistence/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { JwtConstants } from './auth/jwt.const';
import { JwtStrategy } from './auth/jwt.strategy';
dotenv.config({ path: __dirname + '/.env' });

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [SaleDetailEntity, SaleEntity, UserEntity],
      'postgres',
    ),
    JwtModule.register({
      secret: JwtConstants.key,
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  providers: [SaleService, AuthService, JwtStrategy],
  exports: [SaleService, AuthService, JwtStrategy],
})
export class ServiceModule {}
