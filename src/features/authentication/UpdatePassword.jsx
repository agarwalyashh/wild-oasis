import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../../services/apiAuth";

function UpdatePassword() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState, getValues, reset } = useForm({
    defaultValues: {
      password: "",
      repeat: "",
    },
  });
  const { errors } = formState;

  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: (password) => updatePassword(password),
    onSuccess: () => {
      toast.success("Updated Password"),
        queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/dashboard");
    },
    onError: (err) => {
      toast.error(err.message);
      reset();
      navigate("/dashboard");
    },
  });

  function onSubmit(data) {
    console.log(data);

    mutate(data.password);
  }
  return (
    <form
      className="p-10 bg-grey-0 w-[60%] flex flex-col gap-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="gap-8 rounded-lg grid grid-cols-[0.4fr_0.6fr]">
        <label htmlFor="password" className="text-start">
          New Password (min 8 characters)
        </label>
        <div className="flex gap-1">
          <input
            type="password"
            id="password"
            className="border-1 border-grey-400 rounded-md h-12 focus:!outline-none px-2"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Min length required is 8",
              },
            })}
          />
          {errors?.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <label htmlFor="repeat" className="text-start">
          Repeat Password
        </label>
        <div className="flex gap-1">
          <input
            type="password"
            id="repeat"
            className="border-1 border-grey-400 rounded-md h-12 focus:!outline-none px-2"
            {...register("repeat", {
              required: "This field is required",
              validate: (val) =>
                val === getValues().password || "Passwords do not match",
            })}
          />
          {errors?.repeat && (
            <p className="text-red-500">{errors.repeat.message}</p>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="p-3 bg-indigo-600 hover:bg-indigo-800 text-grey-0 rounded-md"
          type="submit"
          disabled={isLoading}
        >
          Update Password
        </button>
      </div>
    </form>
  );
}

export default UpdatePassword;
