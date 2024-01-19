import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
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
      .findOne({ idCategoria: id })
      .populate('produtos')
      .lean();



    if (!categoriaSearch)
      throw new NotFoundException(`Categoria :${id} não encontrada!!`);

    return categoriaSearch;
  }

  async readAll(): Promise<CategoriaPayload[]> {
    return await this.categoriaModel.find().populate('produtos').lean();
  }

  async update(
    id: string,
    updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<CategoriaPayload> {
    await this.categoriaModel.findOneAndUpdate(
      { idCategoria: id },
      updateCategoriaDto
    );
    const updateCategoria = this.categoriaModel.findOne({ idCategoria: id });
    return updateCategoria;
  }

  async delete(id: string): Promise<void> {
    await this.categoriaModel
      .findOneAndDelete({ idCategoria: id })
      .then(result => {
        console.log(result); 
      })
      .catch((err) => {
        throw new ForbiddenException(err);
      });
  }
}
