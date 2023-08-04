import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpInterceptor } from './interceptors/http.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresModule } from './modules/postgres/postgres.module';
import { BookModule } from './modules/book/book.module';
import { StockModule } from './modules/stock/stock.module';
import { BookingModule } from './modules/booking/booking.module';


@Module({
  imports: [
    PostgresModule,
    TypeOrmModule.forFeature(),
    BookModule,
    StockModule,
    BookingModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpInterceptor,
    }],
})
export class AppModule {}
