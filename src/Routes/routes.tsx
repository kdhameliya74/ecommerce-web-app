import { createBrowserRouter } from 'react-router';
import Layout from '@/Layout';
import Products from '@/Pages/Products';
import Orders from '@/Pages/Order';
import Checkout from '@/Pages/Checkout';

const routers = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products />,
            },
            {
                path: '/orders',
                element: <Orders />,
            },
            {
                path: '/checkout',
                element: <Checkout />,
            },
        ],
    },
]);

export default routers;
