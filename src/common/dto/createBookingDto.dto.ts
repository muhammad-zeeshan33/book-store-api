import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty , IsString} from 'class-validator';
export class CreateBookingDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly bookedByName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly bookedByEmail: string;
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    readonly paymentAmount: number;
        

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    readonly bookId: number;
}

