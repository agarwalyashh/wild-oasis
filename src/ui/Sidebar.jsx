import { NavLink } from "react-router-dom"
import logo from "../data/img/logo-light.png"
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { GiWoodCabin } from "react-icons/gi";
import { HiUsers } from "react-icons/hi2";
import { CiSettings } from "react-icons/ci";

function Sidebar() {
  return (
    <div className="mx-auto py-12 col-span-2 font-sono">
      <div className="grid gap-6 tracking-wider justify-center items-center">
        <img src={logo} alt="Logo" className="h-32"/>
        <NavLink to="dashboard" className="flex items-center gap-4 p-4"><span><IoHomeOutline size={24} className="text-indigo-400" /></span>Home</NavLink>
        <NavLink to="bookings" className="flex items-center gap-4 p-4"><span><MdOutlineCalendarMonth size={24} className="text-indigo-400"/></span>Bookings</NavLink>
        <NavLink to="cabins" className="flex items-center gap-4 p-4"><span><GiWoodCabin size={24} className="text-indigo-400"/></span>Cabins</NavLink>
        <NavLink to="users" className="flex items-center gap-4 p-4"><span><HiUsers size={24} className="text-indigo-400"/></span>Users</NavLink>
        <NavLink to="settings" className="flex items-center gap-4 p-4"><span><CiSettings size={24} className="text-indigo-400"/></span>Settings</NavLink>
    </div>
    </div>
  )
}

export default Sidebar
