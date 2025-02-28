/* eslint-disable react/prop-types */
import { FaArrowRightLong } from "react-icons/fa6";
function BookingRow({ bookings }) {
  const status_background = {
    unconfirmed: "#e0f2fe",
    "checked-in": "#dcfce7",
    "checked-out": "#e5e7eb",
  };
  const status_text = {
    unconfirmed: "#0369a1",
    "checked-in": "#15803d",
    "checked-out": "#374151",
  };
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function formatDate(date) {
    const newDate = new Date(date);
    return (
      months[newDate.getMonth()] +
      " " +
      (newDate.getDate().toString().length == 1 ? "0" : "") +
      newDate.getDate() +
      "," +
      newDate.getFullYear()
    );
  }
  function nights(startDate, endDate) {
    const diff = (
      (new Date(startDate) - new Date(endDate)) /
      (3600000 * 24)
    ).toFixed(0);
    return Math.abs(diff);
  }
  function calculate(date) {
    const today = new Date();
    const diff = ((today - new Date(date)) / (3600000 * 24)).toFixed(0);
    let s;
    if (diff > 0) s = diff.toString() + " Days Ago";
    else if (diff == 0) s = "Today";
    else s = "In " + Math.abs(diff.toString()) + " Days";
    return s;
  }

  return (
    <>
      {bookings.map((data) => (
        <div key={data.id} className="h-40">
          <div
            className="grid gap-4 grid-cols-[0.3fr_0.7fr_1fr_0.7fr_0.3fr] h-full font-sono items-center text-start px-10 bg-grey-0 w-full border-b-1 border-grey-300"
            role="row"
          >
            <p className="font-semibold">{data.cabins.name}</p>
            <div className="flex flex-col gap-2">
              <h1 className="font-semibold">{data.guests.fullName}</h1>
              <p>{data.guests.email}</p>
            </div>
            <div className="flex flex-col gap-2">
              <pre className="font-semibold flex items-center">
                {calculate(data.startDate)}{" "}
                <span>
                  <FaArrowRightLong />
                </span>{" "}
                {nights(data.startDate, data.endDate)} nights stay
              </pre>
              <pre className="flex items-center h-full">
                {formatDate(data.startDate)}{" "}
                <span>
                  <FaArrowRightLong />
                </span>{" "}
                {formatDate(data.endDate)}
              </pre>
            </div>
            <div className="flex items-center">
              <p
                className={`uppercase font-semibold text-[14px] border-1 rounded-full w-fit px-4`}
                style={{
                  backgroundColor: status_background[data.status],
                  color: status_text[data.status],
                }}
              >
                {data.status}
              </p>
            </div>
            <pre>$ {data.totalPrice.toFixed(2)}</pre>
          </div>
        </div>
      ))}
    </>
  );
}

export default BookingRow;
