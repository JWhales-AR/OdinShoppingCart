import App from "./App";
import Shopping from "./components/shopping/Shopping";
import Cart from "./components/cart/Cart";
import Hero from "./components/hero/Hero";
import ErrorPage from "./ErrorPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Hero /> },
      { path: "shopping", element: <Shopping /> },
      { path: "cart", element: <Cart /> },
    ],
  },
];

export default routes;
