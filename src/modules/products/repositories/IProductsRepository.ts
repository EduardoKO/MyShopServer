import ICreateProductsDTO from '../dtos/ICreateProductsDTO';
import Product from '../infra/typeorm/entities/Product';

export default interface IProductsRepository {
  create(productData: ICreateProductsDTO): Promise<Product>;
  save(products: Product): Promise<Product>;
  findByName(name: string): Promise<Product | undefined>;
  find(): Promise<Product[]>;
  findById(id: string, amount: string): Promise<Product>;
  findAndRemove(id: string): Promise<void>;
}