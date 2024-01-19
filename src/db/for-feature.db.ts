import {
  Categoria,
  CategoriaSchema,
} from '../categorias/entities/categoria.entity';
import { Produto, ProdutoSchema } from '../produtos/entities/produto.entity';

export default [
  { name: Categoria.name, schema: CategoriaSchema },
  { name: Produto.name, schema: ProdutoSchema },
];
