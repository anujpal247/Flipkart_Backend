import express from 'express';
import {  validateRequestBody } from '../../validators';
import { ProductControllers } from '../../controllers/product.controller';
import { createProductSchema, updateProductSchema } from '../../validators/product.validator';

const productRouter = express.Router();

productRouter.get('/', ProductControllers.getAllProsuct);
productRouter.get('/:id', ProductControllers.getProductById);
productRouter.post('/', 
  validateRequestBody(createProductSchema), 
  ProductControllers.createProduct
);
productRouter.put('/:id', 
  validateRequestBody(updateProductSchema), 
  ProductControllers.updateProduct
);
productRouter.delete('/:id', ProductControllers.deleteProduct);



export default productRouter;