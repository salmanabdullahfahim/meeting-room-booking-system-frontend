import { createBrowserRouter } from "react-router-dom";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/test",
        element: <h2>hellodadsdas</h2>,
      },
    ],
  },
]);

export default router;
