import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import ListAllProductsController from '../controllers/ListAllProductsController';

const productsController = new ProductsController();
const listAllProductsController = new ListAllProductsController();

const productsRouter = Router();

productsRouter.post('/', productsController.create);
productsRouter.get('/', productsController.index);
productsRouter.put('/:id', productsController.update);
productsRouter.delete('/:id', productsController.remove);

productsRouter.get('/all', listAllProductsController.index);


export default productsRouter;