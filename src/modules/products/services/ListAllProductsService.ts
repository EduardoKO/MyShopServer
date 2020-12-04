import { inject, injectable } from "tsyringe";
import IProductsRepository from "../repositories/IProductsRepository";
import Product from "../infra/typeorm/entities/Product";
import AppError from "@shared/errors/AppError";

@injectable()
class ListAllProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  public async execute(): Promise<Product[]> {
    const product = await this.productsRepository.find();

    return product;
  }
}

export default ListAllProductsService;