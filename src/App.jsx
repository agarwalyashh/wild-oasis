import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

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

  return (
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
        <ReactQueryDevtools initialIsOpen={false}/>
        <Toaster position="top-center" gutter={12} containerStyle={{margin: '8px'}} toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            borderRadius: '999px',
          } 
        }}/>
    </QueryClientProvider>
  );
}

export default App;
