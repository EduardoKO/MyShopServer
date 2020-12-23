import { inject, injectable } from "tsyringe";
import IProductsRepository from "../repositories/IProductsRepository";
import Product from "../infra/typeorm/entities/Product";
import AppError from "@shared/errors/AppError";

@injectable()
class ListProductByFamily {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  public async execute(family: string): Promise<Product[]> {

    const product = await this.productsRepository.findByFamily(family);

    if(!product) {
      throw new AppError('Family is required', 400)
    }

    return product;
  }
}

export default ListProductByFamily;