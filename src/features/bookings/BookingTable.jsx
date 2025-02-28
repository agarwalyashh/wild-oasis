import { useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
import { getBookings } from "../../services/apiBooking";
import BookingRow from "./BookingRow";
import { useSearchParams } from "react-router-dom";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";

function BookingTable() {
  const PAGE_SIZE = 3;
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const filteredValue = searchParams.get("status");
  const filter =
    !filteredValue || filteredValue === "all"
      ? null
      : { field: "status", value: filteredValue, method: "eq" };

  const sort = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sort.split("-");
  const sortBy = { field, direction };

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  searchParams.set("page", page);

  const from = (page - 1) * PAGE_SIZE + 1;
  const to = from + PAGE_SIZE - 1;

  function handlePrevious() {
    if (page == 1) return;
    searchParams.set("page", page - 1);
    setSearchParams(searchParams);
  }
  function handleNext() {
    if (to >= count) return;
    searchParams.set("page", page + 1);
    setSearchParams(searchParams);
  }

  const { isLoading, data } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
    refetchInterval: 5000,
  });

  // Pre-fetching the next page for better UX
  queryClient.prefetchQuery({
    queryKey: ["bookings", filter, sortBy, page + 1],
    queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
  });
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  const { data: bookings, count } = data || {};

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
      {bookings && (
        <div className="flex justify-between">
          <p>
            Showing <span className="font-bold">{from}</span> to{" "}
            <span className="font-bold">{Math.min(to, count)}</span> of{" "}
            <span className="font-bold">{count}</span> results
          </p>
          <div className="flex gap-2">
            <button
              className="flex items-center bg-indigo-700 text-grey-100 rounded-md p-3 hover:bg-indigo-900"
              onClick={handlePrevious}
              disabled={page == 1}
            >
              <span>
                <GrFormPrevious />
              </span>
              Previous
            </button>
            <button
              className="flex items-center bg-indigo-700 text-grey-100 rounded-md p-3 hover:bg-indigo-900"
              onClick={handleNext}
              disabled={to >= count}
            >
              Next
              <span>
                <GrFormNext />
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default BookingTable;
