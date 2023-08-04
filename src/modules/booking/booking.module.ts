import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { UnitOfWork } from '../postgres/unit-of-work';
import { StockModule } from '../stock/stock.module';

@Module({
    imports: [StockModule],
    controllers: [BookingController],
    providers: [BookingService, UnitOfWork]
})
export class BookingModule {}
