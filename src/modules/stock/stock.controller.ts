import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Stock } from 'src/common/entity/stock.entity';
import { StockService } from './stock.service';
import { CreateStockDto } from './../../common/dto/createStockDto.dto';

@ApiTags('stock')
@Controller('stock')
export class StockController {
    constructor(
        private readonly stockService: StockService,
    ) {}

    @Post()
    async createStock(@Body() createStockDto: CreateStockDto): Promise<Stock | string> {
        return this.stockService.createStock(createStockDto);
    }

    @Get()
    async findAll(): Promise<Stock[]> {
        return this.stockService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Stock | string> {
        return this.stockService.findOne(id);
    }

    @Put(':id')
    async updateStock(@Param('id') id: number, @Body() updateStockDto: CreateStockDto): Promise<Stock | string> {
        return this.stockService.updateStock(id, updateStockDto);
    }

    @Delete(':id')
    async deleteStock(@Param('id') id: number): Promise<Object> {
        return this.stockService.deleteStock(id);
    }
}
