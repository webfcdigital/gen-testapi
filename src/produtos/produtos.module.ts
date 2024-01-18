import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from 'src/db/for-feature.db';

@Module({
  imports: [MongooseModule.forFeature(forFeatureDb)],
  controllers: [ProdutosController],
  providers: [ProdutosService],
})
export class ProdutosModule {}
