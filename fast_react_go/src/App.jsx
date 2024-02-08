import { useState } from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import Cart from "./features/cart/Cart";
import Menu, { loader as menuloader } from "./features/menu/Menu";
import CreateOrder from "./features/order/CreateOrder";
import Order, { loader as orderloader } from "./features/order/Order";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuloader,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderloader,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
