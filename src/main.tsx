import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import './index.css'
import router from './routes/routes.tsx';
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux';
import { store } from './redux/api/store.ts';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
    <Toaster position="top-right" />
    </Provider>
  </React.StrictMode>,
)
