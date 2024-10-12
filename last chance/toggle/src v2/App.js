import './App.css';
import React from 'react';
import LandingPage from './pages/LandingPage';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Platform from './pages/Platform';
import { NextUIProvider } from "@nextui-org/react";
import Preview from './pages/preview';

function App() {


  const router = createHashRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/app",
      element: <Platform />,
    },
    {
      path: "/preview",
      element: <Preview />,
    }
  ]);


  return (
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>

  );
}

export default App;
