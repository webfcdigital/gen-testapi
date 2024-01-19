import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from '../db/for-feature.db';

@Module({
  imports: [MongooseModule.forFeature(forFeatureDb)],
  controllers: [CategoriasController],
  providers: [CategoriasService],
})
export class CategoriasModule {}
