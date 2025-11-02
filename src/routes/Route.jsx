import { createBrowserRouter } from "react-router-dom";
import RootLayout from '../RootLayout'; 
import Home from "../pages/Home";
import Cart from "../pages/Cart"; 
import ViewProd from "../pages/ViewProd";
import AddProduct from "../products/components/add_prod/AddProduct"
import Edit_prod from "../products/components/edit_prod/Edit_prod";
import Delete_prod from "../products/components/delete_prod/Delete_prod";

export const route = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />, 
        children: [
            {
                index: true, 
                element: <Home />
            },
           
            {
                path: "add-product", 
                element: <AddProduct/>
            },
            {
                path: "view/:id",
                element: <ViewProd/>
            },
            {
                path:"edit/:id",
                element:<Edit_prod/>

            },
            {
                path:"delete/:id",
                element:<Delete_prod/>

            },
            {
                path: "cart", 
                element: <Cart />
            }
           
        ]
    }
  
]);