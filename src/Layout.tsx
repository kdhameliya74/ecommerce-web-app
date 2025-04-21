import { Outlet } from 'react-router';
import Navbar from '@/components/Header/Navbar';

const Layout = () => {
    return (
        <div className="w-full">
            <Navbar />
            <main className="container mx-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
