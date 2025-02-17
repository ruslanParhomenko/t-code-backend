export class CreateProductDto {
  title: string;
  description?: string;
  price: number;
  discountedPrice?: number;
  sku: string;
}
