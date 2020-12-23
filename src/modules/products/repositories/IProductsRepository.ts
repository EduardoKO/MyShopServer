import ICreateProductsDTO from '../dtos/ICreateProductsDTO';
import IFindOneDTO from '../dtos/IFindOneDTO';
import Product from '../infra/typeorm/entities/Product';

export default interface IProductsRepository {
  create(productData: ICreateProductsDTO): Promise<Product>;
  save(products: Product): Promise<Product>;
  find(data: IFindOneDTO): Promise<Product | undefined>;
  findByName(name: string): Promise<Product | undefined>;
  findById(id: string): Promise<Product>;
  findByFamily(name:string): Promise<Product[]>
  findAndRemove(id: string): Promise<void>;
}