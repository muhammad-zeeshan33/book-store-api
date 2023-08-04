import { Injectable } from '@nestjs/common';
import { Stock } from 'src/common/entity/stock.entity';
import { CreateStockDto } from 'src/common/dto/createStockDto.dto';
import { UnitOfWork } from '../postgres/unit-of-work';
import { Book } from 'src/common/entity/book.entity';


@Injectable()
export class StockService {

    constructor(
        private readonly unitOfWork: UnitOfWork,
    ) { }

    async findAll(): Promise<Stock[]> {
        return this.unitOfWork.getRepository(Stock).createQueryBuilder('stock')
        .leftJoinAndSelect('stock.book', 'book')
        .getMany();        
    }
    async createStock(createStockDto: CreateStockDto): Promise<Stock | string> {
        const existingBook = await this.unitOfWork.getRepository(Book).findOneBy({id: createStockDto.bookId});
        if (!existingBook) {
            return "Book reference not found";
        }
        const stock = new Stock();
        stock.quantity = createStockDto.quantity;
        stock.book = existingBook;

        return this.unitOfWork.getRepository(Stock).save(stock)
    }

    async findOne(id: number): Promise<Stock | string> {
        const stock = await this.unitOfWork.getRepository(Stock).createQueryBuilder('stock')        
        .leftJoinAndSelect('stock.book', 'book')
        .where('stock.id = :id', { id })
        .getOne();

        if(stock) {
            return stock;
        }
        return 'Stock not found';
    }

    async updateStock(id: number, updateStockDto: CreateStockDto): Promise<Stock | string> {
        const existingStock = await this.unitOfWork.getRepository(Stock).findOneBy({id: id});
        if (existingStock) {
            const existingBook = await this.unitOfWork.getRepository(Book).findOneBy({id: updateStockDto.bookId});
            if (!existingBook) {
                return "Book reference not found";
            }
            existingStock.quantity = updateStockDto.quantity;
            existingStock.book = existingBook;

            await this.unitOfWork.getRepository(Stock).update(id, existingStock);
            const updatedStock = await this.unitOfWork.getRepository(Stock).findOneBy({ id: id });
            return updatedStock;
        }
        return "Stock not found";
    }

    async deleteStock(id: number) {
        const existingStock = await this.unitOfWork.getRepository(Stock).findOneBy({id: id});
        if (existingStock) {
            await this.unitOfWork.getRepository(Stock).delete(id);
            return {
                message: "Stock Deleted Successfully"
            };
        }
        return "Stock not found";
    }

    // findByBookId 
    async findByBookId(bookId: number): Promise<Stock | string> {
        const stock = await this.unitOfWork.getRepository(Stock).createQueryBuilder('stock')        
        .leftJoinAndSelect('stock.book', 'book')
        .where('stock.bookId = :bookId', { bookId })
        .getOne();

        if(stock) {
            return stock;
        }
        return 'Stock not found';
    }
}
