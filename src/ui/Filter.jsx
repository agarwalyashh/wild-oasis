import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

/* eslint-disable react/prop-types */
function Filter({ filteredValue, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (!searchParams.get(filteredValue)) {
      searchParams.set(filteredValue, "all");
      setSearchParams(searchParams);
    }
  }, [filteredValue, searchParams, setSearchParams]);
  function handleClick(value) {
    searchParams.set(filteredValue, value);
    setSearchParams(searchParams);
  }
  const val = searchParams.get(filteredValue);
  return (
    <div>
      {options.map((option, index) => (
        <button
          key={index}
          className={`px-4 py-2 text-grey-70 hover:bg-indigo-700 hover:text-grey-100 rounded-lg ${
            val == option.value ? "bg-indigo-700 text-grey-100" : ""
          }`}
          onClick={() => handleClick(option.value)}
          disabled={option.value==val}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;
