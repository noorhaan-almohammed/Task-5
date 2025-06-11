import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from './pages/Auth.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import "./lib/axios-interceptor";
import Home from './pages/Home.tsx';
import Items from './pages/Items.tsx';
import IndexItems from './pages/IndexItems.tsx';
import "bootstrap/dist/css/bootstrap.min.css";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    children: [
      { path: "", element: <Login /> },
      { path: "signup", element: <Register /> },
    ],
  },
  {path: "/home",
   element:<Home />,
   children: [
    {path: "", element: <Items/> ,children:[
      {path: "", element: <IndexItems />}
    ]}
   ]
  }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={routers} />
  </StrictMode>
);

