import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/Auth.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import "./lib/axios-interceptor";
import Dashboard from "./pages/Dashboard.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./context/AuthContext.tsx";
import Products from "./components/Products/Products.tsx";
import ShowProduct from "./pages/ShowProduct.tsx";
import AddProduct from "./pages/AddProduct.tsx";
import EditProduct from "./pages/EditeProduct.tsx";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    children: [
      { path: "", element: <Login /> },
      { path: "signup", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <Products />,
      },
      {
        path: "product/:id",
        element: <ShowProduct />,
      },
       {
        path: "addproduct",
        element: <AddProduct />,
      },
       {
        path: "editproduct/:id",
        element: <EditProduct />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={routers} />
    </AuthProvider>
  </StrictMode>
);
