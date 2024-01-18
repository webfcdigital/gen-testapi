import { PartialType } from '@nestjs/swagger';
import { Produto } from '../entities/produto.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';

export class ProdutoPayload extends PartialType(Produto) {
  createdA?: string;
  updateAt?: string;
  Categoria?: Categoria;
}
