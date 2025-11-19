import mongoose, { Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  description?: string;
  categories: string[];
  quantityInStock: number;
}

export interface ProductInput {
  name: string;
  price: number;
  description?: string;
  categories: string[];
  quantityInStock: number;
}

export interface ProductUpdateInput {
  name?: string;
  price?: number;
  description?: string;
  categories?: string[];
  quantityInStock?: number;
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: { 
      type: String, 
      required: [ true, "Product name is required" ],
      trim: true,
    },
    price: { 
      type: Number, 
      required: [ true, "Product price is required" ], 
      min: [0, "Price cannot be negative"]
    },
    description: { type: String },
    categories: { 
      type: [String], 
      required: [ true, "At least one category is required" ]
    },
    quantityInStock: { 
      type: Number, 
      required: [ true, "Quantity in stock is required" ] 
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;