import { useEffect, useState } from 'react';
import { ShoppingCart, Menu } from 'lucide-react';
import { NavLink, useLocation } from 'react-router';
import SidebarMenu from '@/components/Header/SidebarMenu';
import { useAppSelector } from '@/stores/hook';
import CartSidebar from '@/components/Cart/CartSidebar';

const Navbar: React.FunctionComponent = (): React.JSX.Element => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [openCart, setCartOpen] = useState(false);
    const location = useLocation();
    const { items } = useAppSelector(state => state.cart);
    const navLinks = [
        {
            name: 'Home',
            path: '/',
        },
    ];

    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    return (
        <>
            <header className="w-full px-4 md:px-8 py-4 bg-modern-background text-modern-primary shadow-sm sticky top-0 z-1000">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="text-xl font-bold">
                        <NavLink to={'/'}>ShopSwift</NavLink>
                    </div>

                    <nav className="hidden md:flex space-x-8">
                        {navLinks.map((link, index) => (
                            <NavLink key={index} to={link.path} className="nav-link">
                                {link.name}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Right Icons */}
                    <div className="flex items-center space-x-4">
                        <button className="relative" onClick={() => setCartOpen(!openCart)}>
                            <ShoppingCart className="w-6 h-6 cursor-pointer transition" />
                            {items.length !== 0 && (
                                <div className="absolute -top-2 -right-2 p-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-modern-primary text-xs text-modern-accent">
                                    <span>{items.length}</span>
                                </div>
                            )}
                        </button>

                        <button
                            className="md:hidden focus:outline-none"
                            onClick={() => setMenuOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
                <SidebarMenu
                    navLinks={navLinks}
                    open={menuOpen}
                    onClose={() => setMenuOpen(false)}
                />
                <CartSidebar isOpen={openCart} onClose={() => setCartOpen(false)} />
            </header>
        </>
    );
};

export default Navbar;
