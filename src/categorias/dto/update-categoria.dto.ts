import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaDto } from './create-categoria.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {
  @ApiProperty()
  @IsString()
  idCategoria: string;
}
