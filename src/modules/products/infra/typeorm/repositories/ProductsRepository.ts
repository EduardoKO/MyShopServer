import IProductsRepository from "@modules/products/repositories/IProductsRepository";
import { getRepository, Repository } from 'typeorm';

import Product from "../entities/Product";
import ICreateProductsDTO from "@modules/products/dtos/ICreateProductsDTO";
import AppError from "@shared/errors/AppError";
import IFindOneDTO from "@modules/products/dtos/IFindOneDTO";

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create(productData: ICreateProductsDTO): Promise<Product> {
    const formattedProduct = {
      family: productData.family,
      name: productData.name,
      size: productData.size,
      lote: Number(productData.lote),
      amount: Number(productData.amount),
      box: Number(productData.box),
      joint: productData.joint
    }

    const product = this.ormRepository.create(formattedProduct);

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }

  public async findByName(name: string): Promise<Product> {
    const product = await this.ormRepository.findOne({
      where: {
        name
      }
    });

    if(!product) {
      throw new AppError('Product not found', 404)
    }
    
    return product;
  }

  public async findById(id: string): Promise<Product> {
    const product = await this.ormRepository.findOne(id);

    if(!product) {
      throw new AppError('Product not found', 400);
    }

    return product;
  }

  public async find(data: IFindOneDTO): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where : {
        family: data.family,
        name: data.name,
        lote: data.lote
      }
    });

    if(product) {
      return product;
    }
  }

  public async findByFamily(family: string): Promise<Product[]> {
    const products = await this.ormRepository.find({
      where: { family }
    });

    if(!products) {
      throw new AppError('Product not found', 400);
    }

    return products;
  }

  public async findAndRemove(id: string): Promise<void> {
    await this.ormRepository.delete(id)
  }
}

export default ProductsRepository;