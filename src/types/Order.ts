// order.ts
import { Product } from './Product';

export interface Item {
  quantity: number;
  product: Product;
}

export type Order = {
  _id: string;
  total: number;
  items: Item[];
  createdAt: Date;
};
