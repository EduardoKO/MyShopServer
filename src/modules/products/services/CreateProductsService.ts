import { injectable, inject } from 'tsyringe';
import IProductsRepository from '../repositories/IProductsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest { 
  family: string;
  name: string; 
  size: string;
  lote:string;
  amount: string;
  value: string;
  joint: string; 
}

@injectable()
class CreateProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository) {}

  public async execute({family, name, size, lote, amount, value, joint}: IRequest): Promise<void> {
    if(!family || !name || !size || !lote || !amount || !value || !joint) {
      throw new AppError('All fields required', 400)
    }

    await this.productsRepository.create({
      family,
      name,
      size,
      lote,
      amount,
      value,
      joint
    })
  }
}

export default CreateProductsService;