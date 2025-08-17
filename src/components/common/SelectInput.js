import React from "react";
import PropTypes from "prop-types";

const SelectInput = ({ name, label, onChange, defaultOption, value, error, options }) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        value={value || ""}               
        onChange={onChange}
        className={`form-control ${error ? "is-invalid" : ""}`}
      >
        <option value="">{defaultOption}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.text}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object)
};

export default SelectInput;
