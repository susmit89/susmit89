import React from "react";

const Dropdown = ({ name, label, options, error, onChange }) => {
  //we replace other parameter to rest
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        onChange={onChange}
        name={name}
        id={name}
        className="custom-select"
      >
        <option value="" />
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Dropdown;
