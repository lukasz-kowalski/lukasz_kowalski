import React from 'react';
import withHandlers from './withHandlers';

const TextInput = ({ id, label, isRequired, placeholder, errorMsg, handleChange, validate, isValid, value, reference }) => (
  <div className="form-group">
    <label htmlFor={id}>
      {label}{isRequired && <span className="blue">*</span>}
    </label>
    <input
      type="text"
      className={`form-control ${!isValid ? 'is-invalid' : ''}`}
      id={id}
      name={id} 
      placeholder={placeholder} 
      onChange={handleChange}
      onBlur={validate}
      ref={reference}
      value={value}
    />
    <div className="invalid-feedback">
      {errorMsg}
    </div>
  </div>
);

export default withHandlers(TextInput);
