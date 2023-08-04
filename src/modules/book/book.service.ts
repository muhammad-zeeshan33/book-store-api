import { Injectable } from '@nestjs/common';
import { Book } from 'src/common/entity/book.entity';
import { CreateBookDto } from 'src/common/dto/createBookDto.dto';
import { UnitOfWork } from '../postgres/unit-of-work';


@Injectable()
export class BookService {

    constructor(
        private readonly unitOfWork: UnitOfWork,
    ) { }

    async findAll(limit: number, page: number): Promise<Book[]> {
        const skip = (page - 1) * limit;        
        return this.unitOfWork.getRepository(Book).find({ 
                skip,
                take: limit,
            });
    }
    async createBook(createBookDto: CreateBookDto): Promise<Book> {        
        return this.unitOfWork.getRepository(Book).save(createBookDto)
    }

    async findOne(id: number): Promise<Book | string> {

        const existingBook = await this.unitOfWork.getRepository(Book).findOneBy({id: id});
        if(existingBook){
            return existingBook
        }
        return "Book not found";
    }

    async updateBook(id: number, updateBookDto: CreateBookDto): Promise<Book | string> {
        const existingBook = await this.unitOfWork.getRepository(Book).findOneBy({id: id});
        if (existingBook) {
            await this.unitOfWork.getRepository(Book).update(id, updateBookDto);
            const updatedBook = await this.unitOfWork.getRepository(Book).findOneBy({ id: id });
            return updatedBook;
        }
        return "No Book Found";
    }

    async deleteBook(id: number) {
        const existingBook = await this.unitOfWork.getRepository(Book).findOneBy({id: id});
        if (existingBook) {
            await this.unitOfWork.getRepository(Book).delete(id);
            return {
                message: "Book Deleted Successfully"
            };
        }
        return "No Book Found";
    }
}
