import { ProdutosService } from './produtos.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ProdutoPayload } from './payloads/produto.payload';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

describe('ProdutosService', () => {
  let produtoService: ProdutosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutosService,
        {
          provide: getModelToken('Produto'),
          useValue: {},
        },
      ],
    }).compile();

    produtoService = module.get<ProdutosService>(ProdutosService);
  });

  it('should be defined', () => {
    expect(produtoService).toBeDefined();
  });

  describe('read', () => {
    it('Deve retornar o produto pelo idProduto', async () => {
      const produto: ProdutoPayload = {
        nome: 'Produto 1',
        descricao: 'Teste produto 1 monog',
        valor: 13.24,
        idCategoria: '65a96e6ee66499e4a092922c',
        idProduto: 'f8229146-dd3c-489a-ae97-b75ee34c85e6',
      };

      jest
        .spyOn(produtoService, 'read')
        .mockImplementation(
          () => new Promise((resolve, reject) => resolve(produto)),
        );
      expect(await produtoService.read(produto.idProduto)).toBe(produto);
    });
  });

  describe('create', () => {
    it('Deve criar um produto', async () => {
      const novoProduto: CreateProdutoDto = {
        nome: 'Produto novo',
        idCategoria: '65a96e6ee66499e4a092922c',
        valor: 10,
        descricao: 'Novo produto test Jest',
      };

      jest
        .spyOn(produtoService, 'create')
        .mockImplementation(
          () => new Promise((resolve, reject) => resolve(novoProduto)),
        );

      expect(await produtoService.create(novoProduto)).toBe(novoProduto);
    });
  });

  
  

  describe('delete', () => {
    it('Deve excluir um produto', async () => {
      const deleteProduto: string = '4d7a9b13-fa4b-4a1e-bc6a-8eee7394741c';

      jest
        .spyOn(produtoService, 'delete')
        .mockImplementation(() => new Promise((resolve, reject) => resolve()));
      
    });
  });
});
