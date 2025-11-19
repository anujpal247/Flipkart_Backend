import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string(),
  price: z.number().min(0),
  description: z.string().optional(),
  categories: z.array(z.string()),
  quantityInStock: z.number().min(0)
});

export type CreateProductDTO = z.infer<typeof createProductSchema>;

export const updateProductSchema = z.object({
  name: z.string().optional(),
  price: z.number().min(0).optional(),
  description: z.string().optional(),
  categories: z.array(z.string()).optional(),
  quantityInStock: z.number().min(0).optional()
});

export type UpdateProductDTO = z.infer<typeof updateProductSchema>;