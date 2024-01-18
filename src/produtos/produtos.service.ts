import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutoPayload } from './payloads/produto.payload';
import { Produto } from './entities/produto.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectModel(Produto.name) private produtoModel: Model<Produto>,
  ) {}

  async create(createProdutoDto: CreateProdutoDto): Promise<ProdutoPayload> {
    const createProduto = new this.produtoModel(createProdutoDto);
    const produtoCriado = await createProduto.save();
    return produtoCriado;
  }

  async read(id: string): Promise<ProdutoPayload> {
    const ProdutoSearch = await this.produtoModel.findOne({ idProduto: id }).populate('Categoria').lean();

    if (!ProdutoSearch)
      throw new NotFoundException(`Produto :${id} não encontrada!!`);
    console.log(ProdutoSearch.Categoria); 
    return ProdutoSearch;
  }

  async update(
    id: string,
    updateProdutoDto: UpdateProdutoDto,
  ): Promise<ProdutoPayload> {
    await this.produtoModel.updateOne({ _id: id }, updateProdutoDto);
    const updateProduto = this.produtoModel.findById(id);
    return updateProduto;
  }

  async delete(id: string): Promise<void> {
    await this.produtoModel.deleteOne({ _id: id });
  }
}
