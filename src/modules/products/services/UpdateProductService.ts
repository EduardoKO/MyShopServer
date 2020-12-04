import { inject, injectable } from "tsyringe";
import IProductsRepository from "../repositories/IProductsRepository";
import Product from "../infra/typeorm/entities/Product";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: string;
  amount: string;
}

@injectable()
class UpdateProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  public async execute({id, amount}: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(id, amount);

    if(!amount) {
      throw new AppError('Amount is required to update', 400)
    }

    if(!product) {
      throw new AppError('Product not found', 400)
    }

    product.amount = amount;

    return this.productsRepository.save(product);
  }
}

export default UpdateProductsService;