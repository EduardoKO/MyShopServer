import { inject, injectable } from "tsyringe";
import IProductsRepository from "../repositories/IProductsRepository";
import Product from "../infra/typeorm/entities/Product";
import AppError from "@shared/errors/AppError";

interface IRequest {
  name: string
}

@injectable()
class ListProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  public async execute(name: string): Promise<Product> {
    const product = await this.productsRepository.findByName(name);

    if(!product) {
      throw new AppError('Name is required', 400)
    }

    return product;
  }
}

export default ListProductsService;