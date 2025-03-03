/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatCurrency } from "../../utils/helper";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { createPortal } from "react-dom";
import { CiMenuKebab } from "react-icons/ci";

const menuItems = ["Edit", "Delete"];

function CabinRow({ cabins }) {
  const queryClient = useQueryClient();
  const [editingCabinId, setEditingCabinId] = useState(null);
  const [menuID, setMenuID] = useState(null);

  const { mutate } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      toast.success("Cabin deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
    },
    onError: () => toast.error("Something went wrong while deleting cabin"),
  });

  function handleMenu(item, id) {
    if (item === "Edit") {
      setEditingCabinId(id);
      setMenuID(null);
      return;
    }
    if (item === "Delete") {
      setEditingCabinId(id);
      mutate(id);
    }
  }
  function handleClick(id) {
    if (!menuID) setMenuID(id);
    else setMenuID(null);
  }

  return (
    <>
      {cabins?.map((cabin) => (
        <div key={cabin.id}>
          <div
            className="grid gap-4 grid-cols-[0.4fr_0.5fr_1fr_0.5fr_0.3fr_0.3fr] font-poppins justify-center items-center text-center mx-auto
        bg-grey-0 w-full border-b-1 border-grey-300"
            role="row"
          >
            <img src={cabin.image} className="w-40 h-25" />
            <div>{cabin.name}</div>
            <div>Fits up to {cabin.maxCapacity} guests</div>
            <div>{formatCurrency(cabin.regularPrice)}</div>
            <div className="text-green-700">
              {formatCurrency(cabin.discount)}
            </div>
            <div className="relative">
              <span
                className="cursor-pointer"
                onClick={() => handleClick(cabin.id)}
              >
                <CiMenuKebab size={24} />
              </span>
              {menuID === cabin.id && (
                <div className="w-45 bg-grey-0 flex flex-col gap-2 absolute top-5 left-8 z-1 rounded-md">
                  {menuItems.map((item, index) => (
                    <p
                      key={index}
                      className="hover:bg-grey-100 p-2 cursor-pointer"
                      onClick={() => handleMenu(item, cabin.id)}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
          {editingCabinId === cabin.id &&
            createPortal(
              <CreateCabinForm
                cabinToEdit={cabin}
                setEditingCabinId={setEditingCabinId}
                cabinId={cabin.id}
                editingCabinId={editingCabinId}
              />,
              document.getElementById("root")
            )}
        </div>
      ))}
    </>
  );
}

export default CabinRow;
