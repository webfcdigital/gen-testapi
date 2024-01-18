import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Categoria } from './entities/categoria.entity';
import { Model } from 'mongoose';
import { CategoriaPayload } from './payloads/categoria.payload';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel(Categoria.name) private categoriaModel: Model<Categoria>,
  ) {}

  async create(
    createCategoriaDto: CreateCategoriaDto,
  ): Promise<CategoriaPayload> {
    const createCategoria = new this.categoriaModel(createCategoriaDto);
    const categoria = await createCategoria.save();
    return categoria;
  }

  async read(id: string): Promise<CategoriaPayload> {
    const categoriaSearch = await this.categoriaModel
      .findOne({ _id: id })
      .exec();

    if (!categoriaSearch)
      throw new NotFoundException(`Categoria :${id} não encontrada!!`);

    return categoriaSearch;
  }

  async readAll(): Promise<CategoriaPayload[]> {    
    return await this.categoriaModel.find().populate('produtos').lean();
  }

  async update(
    id: number,
    updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<CategoriaPayload> {
    await this.categoriaModel.updateOne({ _id: id }, updateCategoriaDto);
    const updateCategoria = this.categoriaModel.findById(id);
    return updateCategoria;
  }

  async delete(id: number): Promise<void> {
    await this.categoriaModel.deleteOne({ _id: id }); 
  }
}
