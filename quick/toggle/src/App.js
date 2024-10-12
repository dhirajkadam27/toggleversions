
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import LandingPage from './LandingPage';
import LoginPage from "./login";
import DesignPage from "./design";

function App() {

  
  const router = createHashRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/Login",
      element: <LoginPage />,
    },
    {
      path: "/Signup",
      element: <LoginPage />,
    },
    {
      path: "/App",
      element: <DesignPage />,
    }
  ]);


  return (
    <RouterProvider router={router} />
  );
}

export default App;
