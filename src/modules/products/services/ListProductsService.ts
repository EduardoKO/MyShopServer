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

  public async execute(name: string): Promise<Product | undefined> {
    const product = await this.productsRepository.findByName(name);

    return product;
  }
}

export default ListProductsService;