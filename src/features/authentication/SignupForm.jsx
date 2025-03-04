import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { signup } from "../../services/apiAuth";
import toast from "react-hot-toast";

function SignupForm() {
  const { register, formState, getValues, handleSubmit,reset } = useForm({
    defaultValues:{
      name:"",
      email:"",
      password:"",
      repeat:""
    }
  });
  const { errors } = formState;

  const {mutate,isLoading} = useMutation({
    mutationFn:({email,password,fullName})=>signup({email,password,fullName}),
    onSuccess:()=>{
      toast.success("SignUp successfull, Verify through email")
      reset()
    },
    onError:(err)=>{
      toast.error(err.message)
      reset()
    }
  })
  function onSubmit({email,name,password}) {
    mutate({email,password,fullName:name})
  }
  return (
    <form
      className=" p-12 rounded-md w-[60%] bg-grey-0 grid gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-[0.4fr_0.6fr] gap-10">
        <label htmlFor="name" className="text-start">
          Full Name
        </label>
        <div className="flex gap-1">
          <input
            id="name"
            type="text"
            className="border-1 border-grey-500 rounded-md h-14 px-2 focus:!outline-none"
            {...register("name", {
              required: "This field is required",
            })}
          />
          {errors?.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <label htmlFor="email" className="text-start">
          Email Address
        </label>
        <div className="flex gap-1">
          <input
            id="email"
            type="email"
            className="border-1 border-grey-500 rounded-md h-14 px-2 focus:!outline-none"
            {...register("email", {
              required: "This field is required",
            })}
          />
          {errors?.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <label htmlFor="password" className="text-start">
          Password (min 8 characters)
        </label>
        <div className="flex gap-1">
          <input
            id="password"
            type="password"
            className="border-1 border-grey-500 rounded-md h-14 px-2 focus:!outline-none"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors?.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>

        <label htmlFor="repeat" className="text-start">
          Repeat Password
        </label>
        <div className="flex gap-1">
          <input
            id="repeat"
            type="password"
            className="border-1 border-grey-500 rounded-md h-14 px-2 focus:!outline-none"
            {...register("repeat", {
              required: "This field is required",
              validate: (val) => 
                val === getValues().password|| "Passwords do not match",
            })}
          />
          {errors?.repeat && <p className="text-red-500">{errors.repeat.message}</p>}
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 w-full">
        <button
          type="reset"
          className="border-1 border-grey-400 rounded-md p-3"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="p-3 text-grey-0 bg-indigo-600 hover:bg-indigo-800 rounded-md"
        >
          Create New User
        </button>
      </div>
    </form>
  );
}

export default SignupForm;
