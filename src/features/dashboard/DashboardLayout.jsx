import { useRecentBookings } from "../dashboard/useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import { useSearchParams } from "react-router-dom";
import DurationChart from "./DurationChart";

function DashboardLayout() {
  const { bookings, isLoading: isLoading1 } = useRecentBookings();
  const { confirmedStays, isLoading: isLoading2 } = useRecentStays();
  const [searhParams] = useSearchParams();
  const numDays = searhParams.get("last");

  if (isLoading1 || isLoading2) return <Spinner />;
  return (
    <>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
      />
      <div className="col-span-6 bg-grey-0 text-start rounded-lg">
        <DurationChart confirmedStays={confirmedStays} />
      </div>
      <SalesChart numDays={numDays} bookings={bookings} />
    </>
  );
}

export default DashboardLayout;
