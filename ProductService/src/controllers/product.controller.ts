import { Request, Response } from "express";
import { ProductRepository } from "../repositories/product.repository";
import { ProductService } from "../services/product.service";

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);

export const ProductControllers = {
  getAllProsuct: async function (req: Request, res: Response){
    const products = await productService.findAllProducts();
    res.status(200).json({
      data: products,
      message: "Products fetched successfully",
      success: true
    });
  },
  getProductById: async function(req: Request, res: Response){
    const { id } = req.params;
    const product = await productService.findProductById(id);
    res.status(200).json({
      data: product,
      message: "Product fetched successfully",
      success: true
    });
  },
  createProduct: async function(req: Request, res: Response){
    const productData = req.body;
    const product = await productService.createProduct(productData);
    res.status(201).json({
      data: product,
      message: "Product created successfully",
      success: true
    });
  },
  updateProduct: async function(req: Request, res: Response){
    const { id } = req.params;
    const updateProductData = req.body;
    const updatedProduct = await productService.updateProdcut(id, updateProductData);
    res.status(200).json({
      data: updatedProduct,
      message: "Product updated successfully",
      success: true
    });
  },
  deleteProduct: async function (req: Request, res: Response) {
    const { id } = req.params;
    const result = await productService.deleteProduct(id);
    res.status(200).json({
      data: result,
      message: "Product deleted successfully",
      success: true
    });
  },
}