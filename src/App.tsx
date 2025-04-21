import { RouterProvider } from 'react-router';
import routers from '@/Routes/routes.tsx';

function App() {
    return <RouterProvider router={routers} />;
}

export default App;
