import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Book } from 'src/common/entity/book.entity';
import { BookService } from './book.service';
import { CreateBookDto } from 'src/common/dto/createBookDto.dto';
@ApiTags('book')
@Controller('book')
export class BookController {
    constructor(
        private readonly bookService: BookService,
    ) {}

    @Post()
    async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
        return this.bookService.createBook(createBookDto);
    }

    @Get()
    async findAll(
        @Query('limit') limit :number, 
        @Query('page') page : number,
    ): Promise<Book[]> {
        return this.bookService.findAll(limit, page);
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Book | string> {
        return this.bookService.findOne(id);
    }

    @Put(':id')
    async updateBook(@Param('id') id: number, @Body() updateBookDto: CreateBookDto): Promise<Book | string> {
        return this.bookService.updateBook(id, updateBookDto);
    }

    @Delete(':id')
    async deleteBook(@Param('id') id: number): Promise<Object> {
        return this.bookService.deleteBook(id);
    }
}
