import './App.css';
import React from 'react';
import LandingPage from './pages/LandingPage';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Platform from './pages/Platform';
import {NextUIProvider} from "@nextui-org/react";

function App() {


  const router = createHashRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/app",
      element: <Platform />,
    }
  ]);


  return (
    <NextUIProvider>
        <RouterProvider router={router} />
    </NextUIProvider>

  );
}

export default App;
