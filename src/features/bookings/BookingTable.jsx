/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
import { getBookings } from "../../services/apiBooking";
import BookingRow from "./BookingRow";
import { useSearchParams } from "react-router-dom";

function BookingTable() {
  const [searchParams]=useSearchParams()
  const filteredValue=searchParams.get("status")
  const filter=(!filteredValue||filteredValue==="all")?null:{field:"status",value:filteredValue,method:"eq"}
  
  const sort=searchParams.get("sortBy") || "startDate-desc"
  const [field,direction]=sort.split("-")
  const sortBy={field,direction}
  
  const { isLoading, data: bookings } = useQuery({
    queryKey: ["bookings",filter,sortBy],
    queryFn: ()=>getBookings({filter,sortBy}),
    refetchInterval: 5000,
  });
  if (isLoading)
    return (
      <div className="justify-center items-center flex my-auto h-full">
        <Spinner />
      </div>
    );

  return (
    <>
      <div role="table" className="border-1 border-gray-300 my-4">
        <div
          className="grid gap-4 grid-cols-[0.3fr_0.7fr_1fr_0.7fr_0.3fr] font-sono font-semibold h-20 items-center text-start px-10"
          role="row"
        >
          <div>CABIN</div>
          <div>GUESTS</div>
          <div>DATES</div>
          <div>STATUS</div>
          <div>AMOUNT</div>
        </div>
        <BookingRow bookings={bookings} />
      </div>
    </>
  );
}

export default BookingTable;
