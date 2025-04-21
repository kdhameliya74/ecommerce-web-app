import { Product } from './productTypes';

export interface CartItem extends Product {
    qty: number;
}

export interface CartState {
    items: CartItem[];
    subtotal: number;
}
