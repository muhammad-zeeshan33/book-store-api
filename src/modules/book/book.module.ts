import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { UnitOfWork } from '../postgres/unit-of-work';
@Module({
  controllers: [BookController],
  providers: [BookService, UnitOfWork]
})
export class BookModule {}
