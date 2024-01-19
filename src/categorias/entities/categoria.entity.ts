import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Document, Types } from 'mongoose';
import { type } from 'os';
import { Produto } from '../../produtos/entities/produto.entity';
import { v4 as uuid } from 'uuid';
export type CategoriaDocument = Categoria & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true
})
export class Categoria {
  @Prop({
    type: String,
    unique: true,
    default: function genUUID() {
      return uuid();
    },
  })
  idCategoria: string;

  @Prop({
    type: String,
    required: true,
  })
  nome: string;

  @Prop({
    type: Number,
    required: true,
  })
  pctJuros: number;

  @Type(() => Produto)
  produtos: Produto[]; 

}
export const CategoriaSchema = SchemaFactory.createForClass(Categoria);
CategoriaSchema.virtual('produtos', {
  ref: 'Produto',
  localField: 'idCategoria',
  foreignField: 'idCategoria'
});
