import {
  Categoria,
  CategoriaSchema,
} from 'src/categorias/entities/categoria.entity';
import { Produto, ProdutoSchema } from 'src/produtos/entities/produto.entity';

export default [
  { name: Categoria.name, schema: CategoriaSchema },
  { name: Produto.name, schema: ProdutoSchema },
];
