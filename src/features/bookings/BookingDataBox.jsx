/* eslint-disable react/prop-types */
import { HiOutlineHomeModern } from "react-icons/hi2";
import { GoDotFill } from "react-icons/go";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { LuCircleDollarSign } from "react-icons/lu";
import { calculate, formatDate } from "../../utils/helper";
function BookingDataBox({ data }) {
  const extraGuests =
    data.numGuests > 1 ? `+ ${data.numGuests - 1} guests` : null;
  const breakFast = data.guests.hasBreakfast;

  return (
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
      <p className="flex justify-end p-4 text-xl mx-auto w-[95%]">Booked On {formatDate(data.created_at)}</p>
    </div>
  );
}

export default BookingDataBox;
