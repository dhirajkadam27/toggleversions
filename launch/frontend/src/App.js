
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LandingPage from './Pages/Landing';
import Signup from "./Pages/Signup";
import Name from "./Pages/Signup/Name";
import Sites from "./Pages/Sites";
import Site from "./Pages/Site";
import Profile from "./Pages/Profile";

function App() {

  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/signup/name",
      element: <Name />,
    },
    {
      path: "/sites/:id",
      element: <Sites />,
    },
    {
      path: "/profile/:id",
      element: <Profile />,
    },
    {
      path: "/site/:id",
      element: <Site />,
    }
  ]);


  return (
    <RouterProvider router={router} />
  );
}

export default App;
