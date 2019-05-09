import React from 'react';
import withHandlers from './withHandlers';

const Select = ({ id, label, options, isRequired, errorMsg, handleChange, value, isValid, reference }) => (
  <div className="form-group">
    <label htmlFor={id}>
      {label}{isRequired && <span className="blue">*</span>}
    </label>
    <select
      className={`form-control ${!isValid ? 'is-invalid' : ''}`}
      id={id} 
      name={id}
      onChange={handleChange}
      ref={reference}
      value={value}
    >
      <option value="">--Please choose an option--</option>
      {options.length > 0 && options.map((item, index) => 
        <option key={'species' + index} value={item}>{item}</option>
      )}
    </select>
    <div className="invalid-feedback">
      {errorMsg}
    </div>
  </div>
);

export default withHandlers(Select);
export { Select };
