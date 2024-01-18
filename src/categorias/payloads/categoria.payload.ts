import { PartialType } from '@nestjs/swagger';
import { Categoria } from '../entities/categoria.entity';

export class CategoriaPayload extends PartialType(Categoria) {
  createdA?: string;
  updateAt?: string;  
}




