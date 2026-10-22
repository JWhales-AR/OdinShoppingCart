import App from "./App";
import Shopping from "./components/shopping/Shopping";
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
    ],
  },
];

export default routes;
