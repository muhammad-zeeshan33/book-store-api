import { Injectable } from '@nestjs/common';
import { Book } from 'src/common/entity/book.entity';
import { Stock } from 'src/common/entity/stock.entity';
import { Booking } from 'src/common/entity/booking.entity';
import { StockService } from '../stock/stock.service';
import { CreateBookingDto } from 'src/common/dto/createBookingDto.dto';
import { UnitOfWork } from '../postgres/unit-of-work';
@Injectable()
export class BookingService {

    constructor(
        private readonly unitOfWork: UnitOfWork,
        private readonly stockService: StockService
    ) { }

    async createBooking(createBookingDto: CreateBookingDto): Promise<Booking | string> {
        const stock = await this.stockService.findByBookId(createBookingDto.bookId);
        if(typeof stock == "string"){
            return stock;
        }
        if(stock.quantity <= 0){
            return "Not enough stock";
        }
        const booking = new Booking();
        booking.book = stock.book;
        booking.bookedByEmail = createBookingDto.bookedByEmail;
        booking.bookedByName = createBookingDto.bookedByName;
        booking.paymentAmount = createBookingDto.paymentAmount;
        const newBooking = await this.unitOfWork.getRepository(Booking).save(booking);

        stock.quantity = stock.quantity - 1;
        await this.unitOfWork.getRepository(Stock).update(stock.id, stock);
        return newBooking;        
    }

    async findAll(): Promise<Booking[]> {
        return this.unitOfWork.getRepository(Booking).createQueryBuilder('booking')
        .leftJoinAndSelect('booking.book', 'book')
        .getMany();        
    }
}
