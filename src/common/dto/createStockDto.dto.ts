// create stock dto 
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';
export class CreateStockDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    readonly quantity: number;
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    readonly bookId: number;
}

