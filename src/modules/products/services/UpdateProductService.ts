import { inject, injectable } from "tsyringe";
import IProductsRepository from "../repositories/IProductsRepository";
import Product from "../infra/typeorm/entities/Product";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: string;
  amount: number;
}

@injectable()
class UpdateProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  public async execute({id, amount}: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if(!amount || amount === 0 && !id) {
      throw new AppError('Amount is required to update', 400)
    }

    const formattedAmount = amount / product.box;

    console.log(formattedAmount);

    product.amount = product.amount - amount;

    return this.productsRepository.save(product);
  }
}

export default UpdateProductsService;