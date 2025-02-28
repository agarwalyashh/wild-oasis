/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createCabin, editCabin } from "../../services/apiCabins";

import toast from "react-hot-toast";
import { useEffect, useRef } from "react";

function CreateCabinForm({
  cabinToEdit = {},
  setEditingCabinId,
  setShowForm,
  showForm,
  cabinId,
  editingCabinId,
}) {
  // make an empty object by default, as sometimes value might not exist

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditData = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isEditData
      ? editValues
      : {
          name: "",
          maxCapacity: "",
          regularPrice: "",
          discount: 0,
          description: "",
          image: "",
        },
  }); // default values are needed if we want to use reset()

  const queryClient = useQueryClient();
  const { mutate: create, isLoading: isCreating } = useMutation({
    mutationFn: (newCabin) => createCabin(newCabin),
    onSuccess: () => {
      toast.success("New Cabin Created");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: edit, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabin, id }) => editCabin(newCabin, id),
    onSuccess: () => {
      toast.success("Cabin Edited Successfully");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    if (isEditData) {
      const image = data.image?.[0] || data.image;
      edit({ newCabin: { ...data, image }, id: editId });
      setEditingCabinId(null);
    } else {
      create({ ...data, image: data.image[0] });
    }
  }

  function onError(error) {
    console.log(error);
  }
  const isWorking = isCreating || isEditing;
  function handleCross() {
    if (showForm) {
      setShowForm(() => !showForm);
      return;
    }
    if (editingCabinId) {
      setEditingCabinId(null);
      return;
    }
  }
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          if (showForm) {
            setShowForm(() => !showForm);
            return;
          }
          if (editingCabinId) {
            setEditingCabinId(null);
            return;
          }
        }
      }
      document.addEventListener("click", handleClick, true);
      return () => document.removeEventListener("click", handleClick, true);
    },
    [editingCabinId, setEditingCabinId, showForm, setShowForm]
  );
  return (
    <>
      {(showForm || cabinId === editingCabinId) && (
        <div className="fixed inset-0 backdrop-blur-[5px]"></div>
      )}
      <div
        ref={ref}
        className="absolute left-100 flex flex-col rounded-xl shadow-2xl shadow-grey-200 bg-grey-0 font-poppins space-y-6 top-30 p-10 w-300 z-1"
      >
        <button
          className="bg-grey-100 rotate-45 cursor-pointer focus:!outline-none w-10 h-10 rounded-full absolute right-10 top-5"
          onClick={handleCross}
        >
          +
        </button>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="relative border-1 border-grey-100 my-6 py-6 rounded-sm"
        >
          <div className="grid grid-cols-12 gap-10 items-center w-[90%] justify-center">
            <label className="text-2xl col-span-4">Cabin Name</label>
            <div className="col-span-8">
              <input
                type="text"
                className="bg-grey-0 p-4 rounded-lg border border-grey-300 w-full"
                {...register("name", { required: "This field is required" })}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/** Since there are 2 columns only defined, this automatically moves down */}
            <label className="text-2xl col-span-4">Max Capacity</label>
            <div className="col-span-8">
              <input
                type="number"
                className="bg-grey-0 p-4 rounded-lg border border-grey-300 w-full"
                {...register("maxCapacity", {
                  required: "This field is required",
                  min: { value: 1, message: "Min Capacity must be 1" },
                })}
              />
              {errors.maxCapacity && (
                <p className="text-red-500">{errors.maxCapacity.message}</p>
              )}
            </div>
            <label className="text-2xl col-span-4">Regular Price</label>
            <div className="col-span-8">
              <input
                type="number"
                className="bg-grey-0 p-4 rounded-lg border border-grey-300 w-full"
                {...register("regularPrice", {
                  required: "This field is required",
                })}
              />
              {errors.regularPrice && (
                <p className="text-red-500">{errors.regularPrice.message}</p>
              )}
            </div>
            <label className="text-2xl col-span-4">Discount</label>
            <div className="col-span-8">
              <input
                type="number"
                defaultValue={0}
                className="bg-grey-0 p-4 rounded-lg border border-grey-300 w-full"
                {...register("discount", {
                  validate: (value) => {
                    const regularPrice = Number(getValues("regularPrice"));
                    return (
                      value <= regularPrice ||
                      "Discount should be less than regular price"
                    );
                  },
                })}
              />
              {errors.discount && (
                <p className="text-red-500">{errors.discount.message}</p>
              )}
            </div>
            <label className="text-2xl col-span-4">Description</label>
            <div className="col-span-8">
              <textarea
                className="bg-grey-0 p-4 rounded-lg border border-grey-300 w-full h-24"
                {...register("description", {
                  required: "This field is required",
                })}
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>
            <label className="text-2xl col-span-4">Cabin Photo</label>
            <div className="col-span-8 text-start">
              <label
                className="bg-brand-600 p-4 text-gray-200 rounded-lg cursor-pointer"
                htmlFor="image-upload"
              >
                {isWorking ? "Uploaded" : "Upload Image"}
              </label>
              <input
                hidden
                id="image-upload"
                type="file"
                accept="image/*"
                className="bg-grey-0 p-4 rounded-lg border border-grey-300 w-full cursor-pointer"
                {...register("image", {
                  required: isEditData ? false : "This field is required",
                })}
              />
              {errors.image && (
                <p className="text-red-500">{errors.image.message}</p>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-4 w-full">
            <button
              type="reset"
              className="bg-grey-0 rounded-lg border border-grey-300 px-6 py-3"
            >
              Cancel
            </button>
            <button
              className="bg-brand-600 text-grey-50 rounded-lg px-6 py-3 hover:bg-brand-800"
              disabled={isWorking}
            >
              {isEditData ? "Edit Cabin" : "Add Cabin"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateCabinForm;
