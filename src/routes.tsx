import App from "./App";
import Shopping from "./components/shopping/Shopping";
import ErrorPage from "./ErrorPage";

const routes = [
  { path: "/", element: <App />, errorElement: <ErrorPage /> },
  { path: "/shopping", element: <Shopping /> },
];

export default routes;
