import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CalculoParcelaDto {
  @ApiProperty()
  @IsString()
  idProduto: string;

  @ApiProperty()
  @IsNumber()
  numeroParcelas: number;
}
