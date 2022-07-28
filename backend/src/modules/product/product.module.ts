import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductService } from './services/product.service';
import { ProductRepository } from './repository/product.repository';
import { ProductController } from './controllers/product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), ConfigModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService],
})
export class ProductModule {}
