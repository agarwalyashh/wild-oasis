import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteBooking, getBooking } from "../../services/apiBooking";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import Spinner from "../../ui/Spinner";
import BookingDataBox from "./BookingDataBox";
import toast from "react-hot-toast";

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

function BookingDetail() {
  const { bookingId } = useParams("bookings");
  const navigate = useNavigate();

  const { data: booking, isLoading } = useQuery({
    queryKey: ["bookings", bookingId],
    queryFn: () => getBooking(Number(bookingId)),
    retry: false, // by default react query tries to fetch the data 3 times till it finds it. But if data doesnt exist, there is no point in trying 3 times so set it to false
  });

  const queryClient = useQueryClient();
  const {mutate:del}=useMutation({
	mutationFn:(id)=>deleteBooking(id),
	onSuccess:()=>{
		toast.success(`Booking has been deleted successfully`);
		queryClient.invalidateQueries({queryKey:["bookings"]});
		navigate("/bookings");
	},
	onError:()=>{
		toast.error("There was an error while deleting the booking");
  }})

  function handleDelete(id)
  {
	del(id);
  }
  if (isLoading) return <Spinner />;

  return (
    <>
      <header className="flex justify-between items-center p-10 mx-auto">
        <div className="flex gap-8 items-center">
          <h1 className="font-bold text-5xl">Booking #{bookingId}</h1>
          <p
            className="text-xl p-2 rounded-full font-bold uppercase"
            style={{
              backgroundColor: status_background[booking.status],
              color: status_text[booking.status],
            }}
          >
            {booking.status}
          </p>
        </div>
        <div className="flex gap-6 items-center justify-center">
          <button className="p-3 rounded-lg bg-red-500 hover:bg-red-600 text-grey-0 focus:!outline-none"
		  onClick={()=>handleDelete(bookingId)}>
            DELETE
          </button>
          <span
            className="text-indigo-700 flex items-center gap-1 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <span>
              <IoMdArrowBack />
            </span>
            Back
          </span>
        </div>
      </header>
      <BookingDataBox data={booking} />
    </>
  );
}

export default BookingDetail;
