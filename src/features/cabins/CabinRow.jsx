/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatCurrency } from "../../utils/helper";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { createPortal } from "react-dom";

function CabinRow({ cabins }) {
  const queryClient = useQueryClient();
  const [editingCabinId, setEditingCabinId] = useState(null); 

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      toast.success("Cabin deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
    },
    onError: () => toast.error("Something went wrong while deleting cabin"),
  });

  return (
    <>
      {cabins?.map((cabin) => (
        <div key={cabin.id}>
          <div
            className="grid gap-4 grid-cols-6 font-poppins font-semibold justify-center items-center text-center mx-auto
        bg-grey-0 w-full border-b-1 border-grey-300"
            role="row"
          >
            <img src={cabin.image} className="w-40 h-25" />
            <div>{cabin.name}</div>
            <div>Fits up to {cabin.maxCapacity} guests</div>
            <div>{formatCurrency(cabin.regularPrice)}</div>
            <div className="text-green-700">{formatCurrency(cabin.discount)}</div>
            <div className="gap-2 flex">
              <button
                onClick={() => setEditingCabinId(editingCabinId === cabin.id ? null : cabin.id)}
                className="focus:!outline-none"
              >
              <span><MdModeEdit size={24} color="grey"/></span>
              </button>
              <span className="text-4xl">/</span>
              <button
                onClick={() => mutate(cabin.id)}
                disabled={isDeleting}
                className="focus:!outline-none"
              >
                <span><MdDelete size={24} color="grey"/></span>
              </button>
            </div>
          </div>
          {editingCabinId === cabin.id && createPortal(<CreateCabinForm cabinToEdit={cabin} setEditingCabinId={setEditingCabinId} cabinId={cabin.id} editingCabinId={editingCabinId}/>,
        document.getElementById("root"))}
        </div>
      ))}
    </>
  );
}

export default CabinRow;
