import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { MdOutlineLogout } from "react-icons/md";
import { getCurrentUser, logout } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import avatar from "../data/img/default-user.jpg";

function Header() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logout successful");
      queryClient.removeQueries("user");
      navigate("/login",{replace:true});
    },
    onError: (err) => toast.error(err.message),
  });
  
  const {data} = useQuery({
    queryKey:["user"],
    queryFn:getCurrentUser
  })
 const src=data.user_metadata.avatar ||  avatar
  console.log(data);
  
  return (
    <div className="row-span-1 p-6">
      <div className="flex justify-end items-center gap-4">
        <img src={src} className="h-10 w-10"/>
        <p>{data.user_metadata.fullName}</p>
      <button className="cursor-pointer">
          <span>
            <FaRegUser size={28} className="text-indigo-600 hover:bg-grey-300 rounded-md p-2"/>
          </span>
        </button>
        <button onClick={()=>mutate()} className="cursor-pointer">
          <span>
            <MdOutlineLogout size={28} className="text-indigo-600 hover:bg-grey-300 rounded-md p-1"/>
          </span>
        </button>
      </div>
    </div>
  );
}

export default Header;
