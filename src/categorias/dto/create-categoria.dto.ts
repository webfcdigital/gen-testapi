import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty()
  @IsString()
  nome: string;
  @ApiProperty()
  @IsNumber()
  pctJuros: number;
}
