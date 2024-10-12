import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import React from 'react';
import Landing from "./landing";
import Applications from "./applications";
import Application from "./application";
import { Provider } from "./config";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/applications",
      element: <Applications />,
    },
    {
      path: "/app",
      element: <Application />,
    }
  ]);

  return (
    <Provider>

    <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </Provider>
  );
}

export default App;
