import { fetchProducts } from '@/stores/features/productsSlice';
import { useAppDispatch, useAppSelector } from '@/stores/hook';
import { useCallback, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import ProductTile from '@/components/Product/ProductTile';
import { addToCart } from '@/stores/features/cartSlice';
import { Product } from '@/stores/types/productTypes';

function Products() {
    const dispatch = useAppDispatch();
    const { products, loading } = useAppSelector(state => state.products);
    // const { items } = useAppSelector(state => state.cart);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const addToCartHandler = useCallback((product: Product) => {
        dispatch(addToCart(product));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="animate-spin text-modern-primary" size={50} />
            </div>
        );
    }

    return (
        <div className="my-5 px-4 md:px-0">
            <h2 className="text-3xl font-bold text-center py-8">Products</h2>
            <div className="flex md:flex-row flex-wrap gap-4">
                {products.map(product => (
                    <ProductTile addToCart={addToCartHandler} key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default Products;
