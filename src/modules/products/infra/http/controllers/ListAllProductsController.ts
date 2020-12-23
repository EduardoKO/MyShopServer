import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProductByFamily from '@modules/products/services/ListProductByFamily';

export default class ListAllProductsController {

  public async show(request: Request, response:Response): Promise<Response> {
    const listProduct = container.resolve(ListProductByFamily);

    const { family }  = request.params;

    const products = await listProduct.execute(family);

    return response.json(products)
  }
}