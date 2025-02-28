/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
import { getCabins } from "../../services/apiCabins";
import CabinRow from "./CabinRow";
import { useSearchParams } from "react-router-dom";

function CabinTable({ showForm, setShowForm }) {
  const { isLoading, data: cabins } = useQuery({
    // we need an async function inside queryFn
    queryKey: ["cabin"],
    queryFn: getCabins,
    refetchInterval: 5000, // refetchInterval is a function that is called when the query is fetched and time interval is 5 seconds, provided by React Query
  });

  const [searchParams] = useSearchParams();
  if(!cabins)
    return;

  // This is Client Side Filtering
  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  else if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  else filteredCabins = cabins.filter((cabin) => cabin.discount == 0);
  

  const sortBy=searchParams.get("sortBy") || "name-asc";
  const [field,direction]=sortBy.split('-')
  const modifier=direction==='asc'?1:-1;
  const sortedCabins = filteredCabins.sort((a,b)=>(a[field]-b[field])*modifier);
  
  

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
        <CabinRow cabins={sortedCabins} />
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
