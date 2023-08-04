// createBookDto  

import { IsString , IsNotEmpty, IsNumber} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;


  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly coverImg: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly discountRate: number;
    
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly price: number;

}
