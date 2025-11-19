import express from 'express';
import pingRouter from './ping.router';
import productRouter from './product.routes';

const v1Router = express.Router();



v1Router.use('/ping',  pingRouter);
v1Router.use('/products',  productRouter);

export default v1Router;