import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import ErrorHandler from "../pages/ErrorHandler";
import Home from "../pages/Home";
import AddBook from "../components/AddBook/AddBook";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement:<ErrorHandler></ErrorHandler> ,
    children:[
      {
            path:'/',
            element:<Home></Home>,
        },
        {
           path:'/create-book',
           element:<AddBook></AddBook>,
        },
    ], 
  },
]);

export default router;