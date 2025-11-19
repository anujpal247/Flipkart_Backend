import Product, { IProduct, ProductInput, ProductUpdateInput }from "../models/product.model";



export interface IProductRepository {
  findAll(): Promise<IProduct[]>;
  findById(id: string): Promise<IProduct | null>;
  create(productData: ProductInput): Promise<IProduct | null>;
  update(id: string, updateProductData: ProductUpdateInput): Promise<IProduct | null>;
  delete(id: string): Promise<boolean>;
}

export class ProductRepository implements IProductRepository {
  async findAll(): Promise<IProduct[]> {
    const products = await Product.find();
    return products;
  }

  async findById(id: string): Promise<IProduct | null> {
    const product = await Product.findById(id);
    return product;
  }

  async create(productData: IProduct): Promise<IProduct | null> {
    const product = await Product.create(productData)
    return product;
  }

  async update(id: string, updateProductData: ProductUpdateInput): Promise<IProduct | null> {
    const product = await Product.findByIdAndUpdate(id, updateProductData, {new: true});
    return product;
  }

  async delete(id: string): Promise<boolean> {
    const res = await Product.findByIdAndDelete(id);
    return res ? true : false;
  }
}

