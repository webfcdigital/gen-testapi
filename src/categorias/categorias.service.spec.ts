import { Test, TestingModule } from '@nestjs/testing';
import { CategoriasService } from './categorias.service';
import { getModelToken } from '@nestjs/mongoose';
import { CategoriaPayload } from './payloads/categoria.payload';
import { CreateCategoriaDto } from './dto/create-categoria.dto';

describe('CategoriasService', () => {
  let service: CategoriasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriasService,
        {
          provide: getModelToken('Categoria'),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<CategoriasService>(CategoriasService);
  });

  it('Serviço definido', () => {
    expect(service).toBeDefined();
  });

  describe('read', () => {
    it('Deve retornar a categoria pelo valor idCategoria', async () => {
      const categoria: CategoriaPayload = {
        nome: 'Categoria 1',
        pctJuros: 2.5,
        idCategoria: '943d9e2e-6b01-4002-b29b-78637b46e3fb',
      };

      jest
        .spyOn(service, 'read')
        .mockImplementation(
          () => new Promise((resolve, reject) => resolve(categoria)),
        );
      expect(await service.read(categoria.idCategoria)).toBe(categoria);
    });
  });

  describe('create', () => {
    it('Deve criar uma categoria', async () => {
      const novaCategoria: CreateCategoriaDto = {
        nome: 'Nova Categoria',
        pctJuros: 10,
      };

      jest
        .spyOn(service, 'create')
        .mockImplementation(
          () => new Promise((resolve, reject) => resolve(novaCategoria)),
        );

      expect(await service.create(novaCategoria)).toBe(novaCategoria);
    });
  });
});
