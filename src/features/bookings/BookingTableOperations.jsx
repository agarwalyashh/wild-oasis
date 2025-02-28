import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function BookingTableOperations() {
  return (
    <div>
      <div className="flex gap-4">
        <div className="flex bg-white border-1 border-grey-300 rounded-lg p-2">
          <Filter
            filteredValue="status"
            options={[
              { value: "all", label: "All" },
              { value: "checked-out", label: "Checked Out" },
              { value: "checked-in", label: "Checked In" },
              { value: "unconfirmed", label: "Unconfimed" },
            ]}
          />
        </div>
        <SortBy
          options={[
            { value: "startDate-desc", label: "Sort by Date (recent First)" },
            { value: "startDate-asc", label: "Sort by Date (earier First)" },
            { value: "totalPrice-asc", label: "Sort by Amount (low first)" },
            { value: "totalPrice-desc", label: "Sort by Amount (high first)" },
          ]}
        />
      </div>
    </div>
  );
}

export default BookingTableOperations;
