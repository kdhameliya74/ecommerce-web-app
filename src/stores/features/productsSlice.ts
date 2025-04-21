import { ProductState, Product } from '@/stores/types/productTypes';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState: ProductState = {
    loading: false,
    products: [],
    error: null,
};

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    return (await res.json()) as Product[];
});

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchProducts.pending, state => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.error.message || 'Error fetching products';
                state.loading = false;
                state.products = [];
            });
    },
});

export default productSlice.reducer;
