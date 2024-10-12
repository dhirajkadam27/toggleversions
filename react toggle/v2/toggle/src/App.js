import React from 'react';
import Application from './Page/Application';
import Preview from './Page/Preview';
import { Provider } from './config';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Application />,
    },
    {
      path: "preview",
      element: <Preview />,
    },
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
