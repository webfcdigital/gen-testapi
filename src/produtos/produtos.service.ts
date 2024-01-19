import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutoPayload } from './payloads/produto.payload';
import { Produto } from './entities/produto.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CalculoParcelaDto } from './dto/calculo-parcela.dto';

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
    const ProdutoSearch = await this.produtoModel
      .findOne({ idProduto: id })
      .populate('Categoria')
      .lean();

    if (!ProdutoSearch)
      throw new NotFoundException(`Produto :${id} não encontrada!!`);

    return ProdutoSearch;
  }
  async readAll(): Promise<ProdutoPayload[]> {
    const ProdutoSearch = await this.produtoModel
      .find()
      .populate('Categoria')
      .lean();

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

  async calculoParcelas(calculo: CalculoParcelaDto): Promise<any> {
    const dadosProduto = await this.produtoModel
      .findOne({ idProduto: calculo.idProduto })
      .populate('Categoria')
      .lean();

    if (!dadosProduto)
      throw new NotFoundException(`Produto não encontrada!!`);

      console.log(dadosProduto.Categoria); 
    if (!dadosProduto.Categoria.pctJuros)
      throw new NotFoundException(`Categoria inválida`);

    const i = dadosProduto.Categoria.pctJuros / 100;
    const valorParcelas =
      (dadosProduto.valor * i) / (1 - Math.pow(1 + i, -calculo.numeroParcelas));

    return { 
      "produto": dadosProduto.nome,
      "valor": dadosProduto.valor,
      "JurosCategora": dadosProduto.Categoria.pctJuros,
      "numeroParcelas": calculo.numeroParcelas,
      "valorParcelas": valorParcelas 
    };
  }
}
