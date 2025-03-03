/* eslint-disable react/prop-types */
import { HiOutlineHomeModern } from "react-icons/hi2";
import { GoDotFill } from "react-icons/go";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { LuCircleDollarSign } from "react-icons/lu";
import { MdInsertComment } from "react-icons/md";
import { calculate, formatDate } from "../../utils/helper";
import { useState } from "react";
import { updateBooking } from "../../services/apiBooking";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function BookingDataBox({ data }) {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const extraGuests =
    data.numGuests > 1 ? `+ ${data.numGuests - 1} guests` : null;
  const breakFast = data.guests.hasBreakfast;

  const queryClient = useQueryClient();
  const { mutate: checkin } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} has been checked-in successfully`);
      queryClient.invalidateQueries("bookings");
      navigate("/bookings");
    },
    onError: () => {
      toast.error("There was an error while Checking in");
    },
  });
  const { mutate: checkout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} has been checked-out successfully`);
      queryClient.invalidateQueries({queryKey:["bookings"]});
      navigate("/bookings");
    },
    onError: () => {
      toast.error("There was an error while Checking Out");
    },
  });
  function handleCheckIn(id) {
    checkin(id);
  }
  function handleCheckOut(id)
  {
    checkout(id)
  }

  return (
    <>
      <div className="bg-grey-0 rounded-md font-sans w-[95%] mx-auto min-h-100">
        <div className="bg-indigo-500 text-grey-0 py-6 px-10 rounded-md flex justify-between">
          <p className="flex items-center gap-4 tracking-wide">
            <span>
              <HiOutlineHomeModern size={24} />
            </span>
            <span className="font-semibold">{data.numNights} nights</span> in
            Cabin <span className="font-semibold">{data.cabins.name}</span>
          </p>
          <p className="flex items-center tracking-wide">
            {formatDate(data.startDate)} ({calculate(data.startDate)}) -{" "}
            {formatDate(data.endDate)}
          </p>
        </div>
        <div className="p-10 flex flex-col gap-10">
          <div>
            <p className="flex items-center gap-3">
              <span className="font-semibold flex items-center gap-3">
                {data.guests.fullName} {extraGuests && `${extraGuests} `}{" "}
                <span>
                  <GoDotFill size={14} />
                </span>
              </span>{" "}
              {data.guests.email}{" "}
              <span>
                <GoDotFill size={14} />
              </span>{" "}
              National Id {data.guests.nationalId}
            </p>
          </div>
          <div>
            <p className="flex items-center gap-4">
              <span className="mt-1">
                <RiCheckboxCircleFill />
              </span>
              <span className="font-semibold">BreakFast Included?</span>
              {`${breakFast ? "Yes" : "No"}`}
            </p>
          </div>
          {data.observations && (
            <div>
              <p className="flex items-center gap-4">
                <span className="mt-2">
                  <MdInsertComment />
                </span>
                <span className="font-semibold">Observations:</span>
                {data.observations}
              </p>
            </div>
          )}
        </div>
        <div className="w-[95%] rounded-md bg-yellow-100 text-yellow-700 p-5 mx-auto flex items-center justify-between text-2xl">
          <p className="flex gap-4 items-center">
            <span className="">
              <LuCircleDollarSign />
            </span>{" "}
            <pre>
              Total Price ${data.totalPrice.toFixed(2)} (Cabin $
              {data.cabinPrice.toFixed(2)} + Extras $
              {data.extrasPrice.toFixed(2)}){" "}
            </pre>{" "}
          </p>
          <p className="uppercase font-semibold">{`${data.isPaid ? "PAID" : "WILL PAY AT PROPERTY"}`}</p>
        </div>
        <p className="flex justify-end p-4 text-xl mx-auto w-[95%]">
          Booked On {formatDate(data.created_at)}
        </p>
      </div>
      {data.status === "unconfirmed" && (
        <div className="flex mx-auto w-[95%] p-2 m-4 justify-start relative">
          <button
            className="  hover:bg-green-300 py-2 px-4 focus:!outline-none bg-green-100 text-green-700 rounded-full"
            onClick={() => setModal(true)}
          >
            CHECK IN
          </button>
          {modal && (
            <div className="bg-black/30 fixed z-5 inset-0 flex justify-center items-center backdrop-blur-[1px]">
              <div className="gap-6 bg-grey-0 p-6 rounded-lg w-180">
                <h1 className="text-start">
                  Do you confirm that {data.guests.fullName} has paid $
                  {data.totalPrice.toFixed(2)} ?
                </h1>
                <div className="flex justify-center gap-4 p-4">
                  <button
                    onClick={() => setModal(false)}
                    className="py-2 px-4 rounded-md hover:bg-grey-200"
                  >
                    No
                  </button>
                  <button
                    className="py-2 rounded-md bg-indigo-500 hover:bg-indigo-600 text-grey-0 px-4"
                    onClick={() => handleCheckIn(data.id)}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {data.status === "checked-in" && (
        <div className="flex mx-auto w-[95%] p-2 m-4 justify-start">
          <button
            className="hover:bg-grey-300 font-bold px-4 py-2 bg-silver-100 rounded-full text-silver-700"
            onClick={()=>handleCheckOut(data.id)}
          >
            CHECK OUT
          </button>
        </div>
      )}
    </>
  );
}

export default BookingDataBox;
