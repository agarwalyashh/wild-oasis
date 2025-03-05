import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { login } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("yashslg004@gmail.com");
  const [password, setPassword] = useState("12345678");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (user) => {
      toast.success("Login successful");
      queryClient.setQueryData(["user"],user.user)
      navigate("/dashboard");
    },
    onError: (err) => {
      toast.error(err.message);
      setEmail("");
      setPassword("");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutate({ email, password });
  }

  return (
    <div className="bg-white rounded-lg m-10 flex justify-start p-10 items-center text-grey-500">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-start text-3xl">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className="border-1 border-grey-500 rounded-lg h-12 w-130 p-2"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-start text-3xl">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="border-1 border-grey-500 rounded-lg h-12 p-2"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-indigo-600 text-grey-0 p-4 rounded-lg"
          type="submit"
          disabled={isLoading}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
