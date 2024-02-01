export interface Product {
  id?: number;
  url?: string;
  name: string;
  barCode: string;
  brand: string;
  image: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
  status?: number;
}
