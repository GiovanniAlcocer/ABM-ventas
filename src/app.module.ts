import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import "reflect-metadata"
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControllerModule } from './controller/controller.module';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'postgres',
      type: 'postgres',
      host: process.env.DB_URL || 'localhost',
      port: 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'abm',
      database: process.env.DB_NAME || 'abm',
      entities: [__dirname + '/persistence/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ControllerModule,
    ServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
