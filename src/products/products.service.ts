import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateProductDto) {
    return this.prisma.product.create({ data });
  }

  async findAll(query: any) {
    const {
      page = 1,
      perPage = 10,
      sortField = 'createdAt',
      sortOrder = 'desc',
      title,
    } = query;
    const where = title ? { title: { contains: title } } : {};
    const skip = (page - 1) * perPage;
    const products = await this.prisma.product.findMany({
      where,
      skip,
      take: Number(perPage),
      orderBy: { [sortField]: sortOrder },
    });
    const total = await this.prisma.product.count({ where });
    return {
      data: products,
      total,
      page: Number(page),
      perPage: Number(perPage),
    };
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: number, data: UpdateProductDto) {
    await this.findOne(id);
    return await this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prisma.product.delete({
      where: { id },
    });
  }

  async updatePhoto(id: number, photoUrl: string | null) {
    await this.findOne(id);
    return await this.prisma.product.update({
      where: { id },
      data: { photoUrl },
    });
  }
}
