import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Login from "./pages/Login";
import Cabins from "./pages/Cabins";
import PageNotFound from "./pages/PageNotFound";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import AppLayout from "./ui/AppLayout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <PageNotFound />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          element: <Navigate to="dashboard" replace />,
          index: true,
        },
        {
          path: "bookings",
          element: <Bookings />,
        },
        {
          path: "cabins",
          element: <Cabins />,
        },
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
        {
          path: "account",
          element: <Account />,
        },
      ],
    },
    {
      path: "login",
      element: <Login />,
      errorElement: <PageNotFound />,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
