import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Shop from "./components/Shop";
import Home from "./components/Home";
import ProductShow from "./components/ProductShow";
import Cart from "./pages/Cart";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CheckOut from "./pages/CheckOut";
import Orders from "./pages/Orders";
import Page404 from "./pages/Page404";

const router = createBrowserRouter([
    {
      path: '/',
      element:<Layout/>,
      errorElement: <Page404/>,
      children:[
        {
            index:true,
            element:<Home/>

        },
        {
            path:'/shop',
            element:<Shop/>
        },
        {
            path:'/products/:slug',
            element:<ProductShow/>
        },
        {
            path:'/cart/',
            element:<Cart/>
        },
        {
            path:'/checkout/',
            element:<CheckOut/>
        },
        {
            path:'/orders/',
            element:<Orders/>
        },

      ]
    },
    

    {
        path:'/auth',
        element:<AuthLayout/>,
        errorElement: <Page404/>,
        children: [
            {
               path:'/auth/login',
                element:<Login/>
            },
            
            {
                path:'/auth/register',
                element: <Register/>
            }
        ]
    }
]);



export default router;