import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCountryDto {
  @ApiProperty({ description: 'Country name', example: 'Updated Canada' })
  @IsString()
  @MinLength(1)
  name: string;
}
