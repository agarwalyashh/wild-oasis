/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatCurrency } from "../../utils/helper";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function CabinRow({ cabins }) {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      // onSuccess is a function that is called when the mutation is successful, provided by React Query
      toast.success("Cabin deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["cabin"] }); // using invalidateQueries to refetch the data automatically
    },
    onError: () => toast.error("Something went wrong while deleting cabin"),
  });
  return (
    <>
      {cabins?.map((cabin) => (
        <div
          key={cabin.id}
          className="grid gap-4 grid-cols-6 font-poppins font-semibold justify-center items-center text-center mx-auto
        bg-grey-0 w-full border-b-1 border-grey-300"
          role="row"
        >
          <img src={cabin.image} className="w-40 h-25" />
          <div>{cabin.name}</div>
          <div>Fits upto {cabin.maxCapacity} guests</div>
          <div>{formatCurrency(cabin.regularPrice)}</div>
          <div className="text-green-700">{formatCurrency(cabin.discount)}</div>
          <button
            onClick={() => mutate(cabin.id)}
            disabled={isDeleting}
            className="bg-grey-500 py-2 text-grey-0 rounded-md w-30"
          >
            DELETE
          </button>
        </div>
      ))}
    </>
  );
}

export default CabinRow;
