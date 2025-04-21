import { Product } from '@/stores/types/productTypes';

type Props = {
    product: Product;
    addToCart: (product: Product) => void;
};

const ProductTile: React.FC<Props> = ({ product, addToCart }) => {
    return (
        <div className="md:w-1/5 grow-1 h-[400px] bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col">
            <div className="pt-4 px-4">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-44 object-cover rounded-xl"
                />
            </div>
            <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                    <h3 className="text-base font-semibold text-gray-800 mb-1 line-clamp-3">
                        {product.title}
                    </h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                    <p className="text-gray-800 text-xl font-semibold">${product.price}</p>
                </div>
                <button
                    onClick={() => addToCart(product)}
                    className="cursor-pointer mt-4 w-full bg-modern-primary text-white py-2 px-4 rounded-xl hover:opacity-70 transition-colors duration-300"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductTile;
