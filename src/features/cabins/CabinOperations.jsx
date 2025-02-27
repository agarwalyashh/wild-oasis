import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinOperations() {
  return (
    <div className="flex gap-4">
    <div className="flex bg-white border-1 border-grey-300 rounded-lg p-2">
      <Filter
        filteredValue="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      />
    </div>
    <SortBy options={[
        {value:"name-asc",label:"Sort by name (Ascending)"},
        {value:"name-desc",label:"Sort by name (Descending)"},
        {value:"regularPrice-asc",label:"Sort by price (low first)"},
        {value:"regularPrice-desc",label:"Sort by price (high first)"},
        {value:"maxCapacity-asc",label:"Sort by capacity (low first)"},
        {value:"maxCapacity-desc",label:"Sort by capacity (high first)"}
      ]}/>
      </div>
  );
}

export default CabinOperations;
