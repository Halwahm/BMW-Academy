import { Client } from '../../client/model/types';

export enum OrderStatus {
  Created = 'Создан',
  Completed = 'Завершен',
  Rejected = 'Отменен',
}

export interface Product {
  name: string;
  article: string;
  count: number;
  cost: number;
  comment?: string;
}

export interface Order {
  id: number;
  client: Omit<Client, 'id'>;
  deliveryDate: string;
  shippingCost?: number;
  products: Product[];
  status: OrderStatus;
  comments?: string;
}

export interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}
