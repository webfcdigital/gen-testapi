import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Type } from 'class-transformer';
import { Categoria } from 'src/categorias/entities/categoria.entity';
export type ProdutoDocument = Produto & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true
})
export class Produto {
  @Prop({
    type: String,
    unique: true,
    default: function genUUID() {
      return uuid();
    },
  })
  idProduto: string;

  @Prop({
    type: String,
    required: true,
  })
  nome: string;

  @Prop({
    type: String,
    required: true,
  })
  descricao: string;

  @Prop({
    type: Number,
    required: true,
  })
  valor: number;

  @Prop({
    required: true,
    type: String,
  })
  idCategoria?: string;

  @Type(() => Categoria)
  Categoria: Categoria; 
}
export const ProdutoSchema = SchemaFactory.createForClass(Produto);

ProdutoSchema.virtual('Categoria', {
  ref: Categoria,
  localField: 'idCategoria',
  foreignField: '_id'
});
