import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState } from '../types/cartTypes';
import { Product } from '../types/productTypes';

export const initialState: CartState = {
    items: [],
    subtotal: 0,
};

const cartSlice = createSlice({
    name: 'carts',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<Product>) {
            const product = action.payload;
            const existingItem = state.items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.qty += 1;
            } else {
                state.items.push({ ...product, qty: 1 });
            }

            state.subtotal += product.price;
        },
        removeFromCart(state, action: PayloadAction<number>) {
            const productId = action.payload;
            const itemToRemove = state.items.find(item => item.id === productId);

            if (!itemToRemove) return;

            state.subtotal -= itemToRemove.price * itemToRemove.qty;
            state.items = state.items.filter(item => item.id !== productId);
        },
        clearCart(state) {
            state.items = [];
            state.subtotal = 0;
        },
        updateSubtotal(state, action: PayloadAction<number>) {
            state.subtotal = state.subtotal + action.payload;
        },
    },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, clearCart, updateSubtotal } = cartSlice.actions;
