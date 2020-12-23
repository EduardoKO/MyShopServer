import { injectable, inject } from 'tsyringe';
import IProductsRepository from '../repositories/IProductsRepository';
import Product from '../infra/typeorm/entities/Product';
import ICreateProductsDTO from '../dtos/ICreateProductsDTO';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository) {}

  public async execute({family, name, size, box, lote, amount, joint}: ICreateProductsDTO): Promise<Product> {
    
    const product = await this.productsRepository.create({
      family,
      name,
      size,
      box,
      lote,
      amount,
      joint
    });

    return product
  }
}

export default CreateProductsService;