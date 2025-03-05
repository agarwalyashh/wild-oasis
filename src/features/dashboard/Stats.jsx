/* eslint-disable react/prop-types */
import { HiOutlineBriefcase } from "react-icons/hi2";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoStatsChartSharp } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

function Stats({ bookings, confirmedStays,numDays}) {
  const { data } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  const numCabins = data?.length || 1;

  const occupancy =
    confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) /
    (numDays * numCabins);

  const numBookings = bookings.length;
  const numCheckins = confirmedStays.length;
  const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);

  return (
    <div className="grid grid-cols-12">
      <div className="flex gap-6 bg-grey-0 rounded-md h-30 col-span-3 w-75 items-center p-4">
        <div className="p-2 rounded-full w-20 h-20 bg-blue-100 flex items-center justify-center">
          <span>
            <HiOutlineBriefcase size={28} className="text-blue-700" />
          </span>
        </div>
        <div className="grid gap-2 justify-center items-center">
          <span className="text-[14px] font-semibold text-start">BOOKINGS</span>
          <span className="text-start">{numBookings}</span>
        </div>
      </div>
      <div className="flex gap-6 bg-grey-0 rounded-md h-30 col-span-3 w-75 items-center p-4">
        <div className="p-2 rounded-full w-20 h-20 bg-green-100 flex items-center justify-center">
          <span>
            <GiTakeMyMoney size={28} className="text-green-700" />
          </span>
        </div>
        <div className="grid gap-2 justify-center items-center">
          <span className="text-[14px] font-semibold text-start">SALES</span>
          <span className="text-start">${sales.toFixed(2)}</span>
        </div>
      </div>
      <div className="flex gap-6 bg-grey-0 rounded-md h-30 col-span-3 w-75 items-center p-4">
        <div className="p-2 rounded-full w-20 h-20 bg-indigo-100 flex items-center justify-center">
          <span>
            <CiCalendarDate size={28} className="text-indigo-700" />
          </span>
        </div>
        <div className="grid gap-2 justify-center items-center">
          <span className="text-[14px] font-semibold text-start">
            CHECK INS
          </span>
          <span className="text-start">{numCheckins}</span>
        </div>
      </div>
      <div className="flex gap-6 bg-grey-0 rounded-md h-30 col-span-3 w-100 items-center p-4">
        <div className="p-2 rounded-full w-20 h-20 bg-yellow-100 flex items-center justify-center">
          <span>
            <IoStatsChartSharp size={28} className="text-yellow-700" />
          </span>
        </div>
        <div className="grid gap-2 justify-center items-center">
          <span className="text-[14px] font-semibold text-start">
            OCCUPANCY RATE
          </span>
          <span className="text-start">{Math.round(occupancy * 100)}%</span>
        </div>
      </div>
    </div>
  );
}

export default Stats;
