import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { UnitOfWork } from '../postgres/unit-of-work';
@Module({
  controllers: [StockController],
  providers: [StockService, UnitOfWork],
  exports: [StockService]
})
export class StockModule {}
