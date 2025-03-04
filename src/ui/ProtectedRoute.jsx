/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/apiAuth";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // //1. Load the authenticated user
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const isAuthenticated = user?.role === "authenticated";

  // //2. If not authenticated, redirect to login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login",{replace:true});
    },
    [navigate, isAuthenticated, isLoading]
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );

  // //3. If user exists, render the app
  if(isAuthenticated)
    return children;
}

export default ProtectedRoute;
