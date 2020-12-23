import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductsService from '@modules/products/services/CreateProductsService';
import ListProductsService from '@modules/products/services/ListProductsService';
import UpdateProductsService from '@modules/products/services/UpdateProductService';
import DeleteProductsService from '@modules/products/services/DeleteProductsService';
import AppError from '@shared/errors/AppError';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { family, name, size, box, lote, amount, joint } = request.body;

    const createProduct = container.resolve(CreateProductsService);
    const listProducts = container.resolve(ListProductsService);

    await listProducts.execute(name);

    const product = await createProduct.execute({
      family,
      name,
      size,
      box,
      lote,
      amount,
      joint
    });

    return response.json(product);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const listProducts = container.resolve(ListProductsService);

    const product = await listProducts.execute(name);

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { amount } = request.body

    const updateProducts = container.resolve(UpdateProductsService);

    const updateProduct = await updateProducts.execute({id, amount});

    return response.json(updateProduct);
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    
    const deleteProducts = container.resolve(DeleteProductsService);

    const deleted = await deleteProducts.execute(id);

    return response.status(204).json();
  }
}