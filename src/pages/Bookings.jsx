import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";

function Bookings() {
  return (
    <div className="bg-grey-100 w-[98%] h-full px-12 py-20 overflow-scroll relative">
      <div className="flex justify-between items-center">
        <h1 className="text-5xl font-poppins font-bold">All Bookings</h1>
        <BookingTableOperations/>
      </div>
      <BookingTable />
    </div>
  );
}

export default Bookings;
