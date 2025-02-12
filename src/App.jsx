import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Login from "./pages/Login";
import Cabins from "./pages/Cabins"
import PageNotFound from "./pages/PageNotFound"
import Account from "./pages/Account"
import Settings from "./pages/Settings"
import Users from "./pages/Users"

function App() {
  const router = createBrowserRouter([
    {
      path:'dashboard',
      element:<Dashboard/>,
      errorElement:<PageNotFound/>
    },
    {
      element:<Navigate to="dashboard" replace/>,
      index:true,
      errorElement:<PageNotFound/>
    },
    {
      path:'bookings',
      element:<Bookings/>,
      errorElement:<PageNotFound/>
    },
    {
      path:'cabins',
      element:<Cabins/>,
      errorElement:<PageNotFound/>
    },
    {
      path:'users',
      element:<Users/>,
      errorElement:<PageNotFound/>
    },
    {
      path:'settings',
      element:<Settings/>,
      errorElement:<PageNotFound/>
    },
    {
      path:'login',
      element:<Login/>,
      errorElement:<PageNotFound/>
    },
    {
      path:'account',
      element:<Account/>,
      errorElement:<PageNotFound/>
    }
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
