import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function DashboardFilter() {
  const filterOptions = [
    { label: "Last 7 Days", value: "7" },
    { label: "Last 30 Days", value: "30" },
    { label: "Last 90 Days", value: "90" },
  ];
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(
    function () {
      if (!searchParams.get("last")) {
        searchParams.set("last", "7");
        setSearchParams(searchParams);
      }
    },
    [searchParams, setSearchParams]
  );
  function handleClick(value) {
    searchParams.set("last", value);
    setSearchParams(searchParams);
  }
  const val = searchParams.get("last");
  return (
    <div className="flex bg-grey-0 rounded-md p-2 gap-2">
      {filterOptions.map((option, index) => (
        <button
          className={`${val === option.value ? "bg-indigo-600 text-grey-0" : ""} p-2 focus:!outline-none rounded-md`}
          key={index}
          onClick={() => handleClick(option.value)}
          disabled={val === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default DashboardFilter;
