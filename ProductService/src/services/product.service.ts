import logger from "../config/logger.config";
import { IProduct } from "../models/product.model";
import { IProductRepository } from "../repositories/product.repository";
import { BadRequestError, InternalServerError, NotFoundError } from "../utils/errors/app.error";
import { CreateProductDTO, UpdateProductDTO } from "../validators/product.validator";

export interface IProductService {
  findAllProducts(): Promise<IProduct[]>
  findProductById(id: string): Promise<IProduct | null>
  createProduct(productData: CreateProductDTO): Promise<IProduct | null>
  updateProdcut(id: string, updateProductData: UpdateProductDTO): Promise<IProduct | null>
  deleteProduct(id: string): Promise<boolean>
}

export class ProductService implements IProductService {
  private productRepository: IProductRepository;

  constructor(_productRepository: IProductRepository){
    this.productRepository = _productRepository
  }
  async findAllProducts(): Promise<IProduct[]> {
    const products = await this.productRepository.findAll();
    return products;
  }

  async findProductById(id: string): Promise<IProduct | null> {
    const product = await this.productRepository.findById(id);
    if(!product){
      logger.info(`Product not found with ${id} id.`);
      throw new NotFoundError(`Product not found with ${id} id.`);
    }
    return product;
  }

  async createProduct(productData: CreateProductDTO): Promise<IProduct | null> {
    const product = await this.productRepository.create(productData);
    if(!product){
      throw new InternalServerError("Something went worng");
    }
    return product;
  }

  async updateProdcut(id: string, updateProductData: UpdateProductDTO): Promise<IProduct | null> {
    const updatedProduct = await this.productRepository.update(id, updateProductData);

    if(!updatedProduct){
      logger.info(`product not found ${id}`);
      throw new BadRequestError(`Product not found ${id}`);;
    }
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<boolean> {
    return await this.productRepository.delete(id);
  }
}