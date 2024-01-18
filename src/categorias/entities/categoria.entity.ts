import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
export type CategoriaDocument = Categoria & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
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

}
export const CategoriaSchema = SchemaFactory.createForClass(Categoria);

