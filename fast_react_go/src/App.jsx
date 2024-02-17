import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { action as updateOrder } from "./features/order/UpdateOrder";
import Home from "./ui/Home";
import Cart from "./features/cart/Cart";
import Menu, { loader as menuloader } from "./features/menu/Menu";
import CreateOrder, {
  action as createAction,
} from "./features/order/CreateOrder";
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
        action: createAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderloader,
        action: updateOrder,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
