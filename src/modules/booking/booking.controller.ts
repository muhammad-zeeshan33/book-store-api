import { Body, Controller, Get, Post } from '@nestjs/common';
import { Booking } from 'src/common/entity/booking.entity';
import { BookingService } from './booking.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateBookingDto } from 'src/common/dto/createBookingDto.dto';

@ApiTags('booking')
@Controller('booking')
export class BookingController {
    constructor(private readonly bookingService: BookingService) { }

    @Post()
    async createBooking(@Body() createBookingDto: CreateBookingDto): Promise<Booking | string> {
        return this.bookingService.createBooking(createBookingDto);
    }

    @Get()
    async findAll(): Promise<Booking[]> {
        return this.bookingService.findAll();
    }


}
