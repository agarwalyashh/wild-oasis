/* eslint-disable react/prop-types */
import Select from "react-select"
const customStyles = {
  control: (provided) => ({
    ...provided,
    width: "270px",
    padding: "4px",
    border: "1px solid #d1d5db",
    backgroundColor: "white",
    color: "white",
    cursor: "pointer",
    alignItems: "left",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#d1d5db" : "white",
    color: "#414558",
    display: "flex",
    padding: "10px",
    cursor: "pointer",
    alignItems: "left",
  }),
  singleValue: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "left",
    color: "#414558",
  }),
  input: (provided) => ({
    ...provided,
    color: "#414558",
  }),
  placeholder: (provided) => ({
    ...provided,
    textAlign: "left",
    width: "100%",
  }),
};
function SelectComponent({options,onChange,value}) {
  return (
    <>
      <Select options={options} styles={customStyles} onChange={(selected)=>onChange(selected.value)} value={options.find(option => option.value === value)}/>
    </>
  )
}

export default SelectComponent
