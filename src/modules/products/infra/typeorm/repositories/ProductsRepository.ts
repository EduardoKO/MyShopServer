import IProductsRepository from "@modules/products/repositories/IProductsRepository";
import { getRepository, Repository } from 'typeorm';

import Product from "../entities/Product";
import ICreateProductsDTO from "@modules/products/dtos/ICreateProductsDTO";
import AppError from "@shared/errors/AppError";

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create(productData: ICreateProductsDTO): Promise<Product> {
    const find = await this.ormRepository.findOne({
      where: {
        family: productData.family,
        name: productData.name
      }
    });

    if(find) {
      throw new AppError('This product already exists', 400)
    }

    const product = this.ormRepository.create(productData);

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const products = await this.ormRepository.findOne({
      where: {
        name
      }
    });

    if(!products) {
      throw new AppError('Product not found', 400)
    }

    return products
  }

  public async findById(id: string, amount: string): Promise<Product> {
    const product = await this.ormRepository.findOne(id);

    if(!product) {
      throw new AppError('Product not found', 400);
    }

    return product;
  }

  public async findAndRemove(id: string): Promise<void> {
    await this.ormRepository.delete(id)
  }

  public async find(): Promise<Product[]> {
    const products = await this.ormRepository.find();

    return products;
  }
}

export default ProductsRepository;