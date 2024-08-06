import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./page/Home";
import RootLayout from "./layout/RootLayout";
import ShopPage from "./page/Shop";
import DetailsPage from "./page/Details";
import CartPage from "./page/Cart";
import CheckoutPage from "./page/Checkout";
import LoginPage from "./page/Login";
import RegisterPage from "./page/Register";
import { loader as loaderData } from "./layout/RootLayout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      loader: loaderData,
      id: "data",
      children: [
        { index: true, element: <HomePage /> },
        { path: "shop/:categories", element: <ShopPage /> },
        { path: "details/:productId", element: <DetailsPage /> },
        { path: "carts", element: <CartPage /> },
        { path: "checkout", element: <CheckoutPage /> },

        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
