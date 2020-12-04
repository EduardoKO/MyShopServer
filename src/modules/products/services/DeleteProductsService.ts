import { inject, injectable } from "tsyringe";
import IProductsRepository from "../repositories/IProductsRepository";
import Product from "../infra/typeorm/entities/Product";
import AppError from "@shared/errors/AppError";

@injectable()
class DeleteProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  public async execute(id: string): Promise<void> {
    if(!id) {
      throw new AppError('Id is required to remove', 404)
    }

    await this.productsRepository.findAndRemove(id);
  }
}

export default DeleteProductsService;