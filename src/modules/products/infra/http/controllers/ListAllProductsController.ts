import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListAllProductsService from '@modules/products/services/ListAllProductsService';

export default class ListAllProductsController {
  public async index(request: Request, response: Response): Promise<Response> {

    const listProducts = container.resolve(ListAllProductsService)

    const products = await listProducts.execute();

    return response.json(products);
  }
}