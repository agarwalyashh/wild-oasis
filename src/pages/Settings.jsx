import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSettings, updateSetting } from "../services/apiSettings";
import Spinner from "../ui/Spinner";
import toast from "react-hot-toast";

function Settings() {
  const { isLoading, data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings ? settings : {};
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn:(newSettings)=> updateSetting(newSettings),
    onSuccess: () => {
      toast.success("Settings updated Succesfully");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => toast.error(err.message),
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="bg-grey-100 p-18 h-screen">
      <div className="text-5xl font-bold font-poppins text-start">
        Update Hotel Settings
      </div>
      <div className="bg-white my-8 rounded-md h-100 ">
        <form className="h-full w-[80%] grid items-center grid-cols-2 p-2 gap-4">
          <label htmlFor="min" className="">
            Minimum nights/bookings
          </label>
          <input
            id="min"
            type="number"
            className="border-1 border-grey-300 h-14 rounded-md w-90 px-2 outline-none"
            defaultValue={minBookingLength}
            onBlur={(e)=>mutate({...settings,minBookingLength:e.target.value})}
          />
          <label htmlFor="max">Maximum nights/bookings</label>
          <input
            id="max"
            type="number"
            className="border-1 border-grey-300 h-14 rounded-md w-90 px-2 outline-none"
            defaultValue={maxBookingLength}
            onBlur={(e)=>mutate({...settings,maxBookingLength:e.target.value})}
          />
          <label htmlFor="guests">Maximum guests/bookings</label>
          <input
            id="guests"
            type="number"
            className="border-1 border-grey-300 h-14 rounded-md w-90 px-2 outline-none"
            defaultValue={maxGuestsPerBooking}
            onBlur={(e)=>mutate({...settings,maxGuestsPerBooking:e.target.value})}
          />
          <label htmlFor="breakfast">Breakfast Price</label>
          <input
            id="breakfast"
            type="number"
            className="border-1 border-grey-300 h-14 rounded-md w-90 px-2 outline-none"
            defaultValue={breakfastPrice}
            onBlur={(e)=>mutate({...settings,breakfastPrice:e.target.value})}
          />
        </form>
      </div>
    </div>
  );
}

export default Settings;
