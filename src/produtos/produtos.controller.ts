import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { CalculoParcelaDto } from './dto/calculo-parcela.dto';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtosService.create(createProdutoDto);
  }

  @Post('/calcular-parcelas')
  calcularParcelas(@Body() calculoParcela: CalculoParcelaDto) {
    return this.produtosService.calculoParcelas(calculoParcela);
  }

  @Get('/list')
  findAll() {
    return this.produtosService.readAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtosService.read(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtosService.update(id, updateProdutoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtosService.delete(id);
  }
}
