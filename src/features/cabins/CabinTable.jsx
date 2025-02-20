/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
import { getCabins } from "../../services/apiCabins";
import CabinRow from "./CabinRow";

function CabinTable({ showForm, setShowForm }) {
  const { isLoading, data: cabins } = useQuery({
    // we need an async function inside queryFn
    queryKey: ["cabin"],
    queryFn: getCabins,
    refetchInterval: 5000, // refetchInterval is a function that is called when the query is fetched and time interval is 5 seconds, provided by React Query
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
          className="grid gap-4 grid-cols-6 font-poppins font-semibold h-20 items-center text-center"
          role="row"
        >
          <div></div>
          <div>CABIN</div>
          <div>CAPACITY</div>
          <div>PRICE</div>
          <div>DISCOUNT</div>
        </div>
        <CabinRow cabins={cabins} />
      </div>
      <button
        className="bg-brand-600 text-grey-50 w-full rounded-md text-2xl py-4 hover:bg-brand-800 my-6"
        onClick={() => setShowForm(!showForm)}
      >
        Add New Cabin
      </button>
    </>
  );
}

export default CabinTable;
