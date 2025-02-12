/* eslint-disable react/prop-types */
function Checkbox({ checked, onChange, disabled = false, id, children }) {
  return (
    <>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={!disabled ? id : ""}>{children}</label>
    </>
  );
}

export default Checkbox;