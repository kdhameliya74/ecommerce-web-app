import React from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/stores/hook';
import { CartItem as CartItemType } from '@/stores/types/cartTypes';
import { removeFromCart } from '@/stores/features/cartSlice';

interface CartItemProps {
    item: CartItemType;
}

interface SidebarProps {
    isOpen: boolean;
    onClose?: () => void;
}

const CartSidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const { items, subtotal } = useAppSelector(state => state.cart);
    return (
        <div
            className={`fixed top-[60px] shadow-md border-l border-l-gray-100 right-0 h-full w-full md:w-96 bg-white z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
        >
            <div className="flex justify-between items-center p-4 border-b border-b-gray-100 shadow-md">
                <span className="font-semibold text-lg">Cart Items</span>
                <button className="cursor-pointer" onClick={onClose}>
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="mt-4 p-4 max-h-[calc(100%-230px)] overflow-auto">
                {items.length == 0 && <NoCartItems />}
                {items.length !== 0 && items.map(item => <CartItem key={item.id} item={item} />)}
            </div>

            {items.length !== 0 && (
                <div className="absolute bottom-[60px] left-0 w-full border-t border-t-gray-100 p-4 bg-white">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">Subtotal</span>
                        <span className="text-base font-semibold text-gray-800">
                            ${Number(subtotal).toFixed(2)}
                        </span>
                    </div>
                    <button className="mt-4 w-full bg-modern-primary text-white text-sm py-2 rounded hover:opacity-70 transition">
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartSidebar;

const NoCartItems = () => {
    return (
        <div className="flex flex-col items-center">
            <ShoppingBag className="w-15 h-15 mb-3 text-gray-500" />
            <div className="text-center text-gray-400">
                you have no any items in cart. Make sure you have added one.
            </div>
        </div>
    );
};

const CartItem: React.FC<CartItemProps> = React.memo(({ item }) => {
    const dispatch = useAppDispatch();

    return (
        <div className="flex items-start gap-3 py-3 border-b">
            <img className="w-14 h-20 object-contain" src={item.image} alt={item.title} />

            <div className="flex-grow">
                <p className="text-base font-medium line-clamp-1">{item.title}</p>
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="text-sm mt-1">
                    Qty: <span className="font-semibold mr-4">{item.qty}</span>
                    Price: <span className="font-semibold">${item.price}</span>
                </p>
            </div>

            <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="bg-red-100 p-1 rounded hover:bg-red-500 hover:text-white transition cursor-pointer"
                aria-label="Remove item"
            >
                <X size={16} />
            </button>
        </div>
    );
});
