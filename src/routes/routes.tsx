import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import ErrorHandler from "../pages/ErrorHandler";
import Home from "../pages/Home";
import AddBook from "../components/AddBook/AddBook";
import AllBook from "@/components/AllBook/AllBook";
import BookPage from "@/pages/BookPage";
import UpdateBook from "@/components/UpdateBook/UpdateBook";



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
        {
           path:"/books",
           element:<AllBook></AllBook>,
        },
        {
            path:"/books/:id",
            element:<BookPage></BookPage>,
        },
        {
            path:"/edit-book/:id",
            element:<UpdateBook></UpdateBook>,
        },
    ], 
  },
]);

export default router;