import { useSearchParams } from "react-router-dom";
import SelectComponent from "./SelectComponent";

/* eslint-disable react/prop-types */
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleChange(e) {
    searchParams.set("sortBy", e);
    setSearchParams(searchParams);
  }
  const selected=searchParams.get("sortBy")||""


  return (
    <div>
      <SelectComponent options={options} onChange={handleChange} value={selected}/>
    </div>
  );
}

export default SortBy;
