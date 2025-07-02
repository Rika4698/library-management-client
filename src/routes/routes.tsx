import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import ErrorHandler from "../pages/ErrorHandler";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement:<ErrorHandler></ErrorHandler> ,
    children:[], 
  },
]);

export default router;