import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, updateUserData } from "../../services/apiAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function UpdateUserDataForm() {
  const navigate = useNavigate();
  const queryClient=useQueryClient()
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  const { email, fullName, avatar } = data.user_metadata;
  const [name, setName] = useState(fullName);
  const [image, setImage] = useState(avatar);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ name, image }) =>
      updateUserData({ fullName: name, avatar: image }),
    onSuccess: () => {
      toast.success("User data updated successfully");
      queryClient.invalidateQueries({queryKey:["user"]});
      navigate("/dashboard");
    },
    onError: (err) => {
      toast.error(err.message);
      setName(fullName);
      setImage(avatar);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutate({ name, image });
  }
  return (
    <div className="bg-grey-0 p-10 w-[60%] flex flex-col gap-8">
      <form className="grid grid-cols-[0.4fr_0.6fr] rounded-lg gap-10">
        <label htmlFor="email" className="text-start">
          Email Address:
        </label>
        <input
          id="email"
          type="email"
          disabled
          value={email}
          className="border-1 border-grey-400 rounded-md h-12 px-2 w-100"
        />
        <label htmlFor="name" className="text-start">
          Full Name:
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="border-1 border-grey-400 rounded-md h-12 px-2 w-100"
        />
        <label htmlFor="image" className="text-start">
          Avatar:
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => setImage(e.target.files[0])}
          className="border-1 border-grey-400 rounded-md h-12 px-2 w-100"
        />
        <label
          className="text-grey-0 p-2 bg-indigo-600 rounded-md w-60 cursor-pointer"
          type="button"
          htmlFor="image"
        >
          Upload Avatar
        </label>
      </form>
      <div className="flex justify-end gap-4">
        <button
          className="p-3 text-grey-0 bg-indigo-600 hover:bg-indigo-800 rounded-md"
          disabled={isLoading}
          type="submit"
          onClick={handleSubmit}
        >
          Update Account
        </button>
      </div>
    </div>
  );
}

export default UpdateUserDataForm;
