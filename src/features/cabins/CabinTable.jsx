import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helper";

function CabinTable() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabin"],
    queryFn: getCabins, // we need an async function inside queryFn
  });
  if (isLoading)
    return (
      <div className="justify-center items-center flex my-auto h-full">
        <Spinner />
      </div>
    );
  return (
    <div role="table" className="border-1 border-slate-300 my-4">
      <div className="grid gap-4 grid-cols-6 font-poppins font-semibold h-20 items-center text-center" role="row">
        <div></div>
        <div>CABIN</div>
        <div>CAPACITY</div>
        <div>PRICE</div>
        <div>DISCOUNT</div>
      </div>
      {cabins?.map((cabin) => (
        <div key={cabin.id} className="grid gap-4 grid-cols-6 font-poppins font-semibold justify-center items-center text-center mx-auto
        bg-white w-full" role="row">
          <img src={cabin.image} alt={cabin.name} className="w-40 h-25" />
          <div>{cabin.name}</div>
          <div>Fits upto {cabin.maxCapacity} guests</div>
          <div>{formatCurrency(cabin.regularPrice)}</div>
          <div className="text-green-400">{formatCurrency(cabin.discount)}</div>
          <button className="bg-slate-300 py-2 text-white rounded-md w-30">DELETE</button>
      </div>))}
    </div>
  );
}

export default CabinTable;
