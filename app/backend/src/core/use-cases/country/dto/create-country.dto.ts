import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCountryDto {
  @ApiProperty({ description: 'Country name', example: 'Canada' })
  @IsString()
  @MinLength(1)
  name: string;
}
