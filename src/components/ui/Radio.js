import React from 'react';
import withHandlers from './withHandlers';

const Radio = ({ radioData, id, label, isRequired, errorMsg, handleChange, isValid, reference, value }) => (
  <React.Fragment>
    <label htmlFor={id}>
      {label}{isRequired && <span className="blue">*</span>}
    </label>
    <div className="form-check" id={id}>
      {radioData && radioData.map((item, index) =>
        <React.Fragment key={item.id + index}>
          <input 
            className={`form-check-input ${!isValid ? 'is-invalid' : ''}`}
            type="radio"
            name={id} 
            id={item.id} 
            value={item.value}
            ref={index === 0 ? reference : undefined}  // set focus on first radio button
            checked={value === item.value}
            onChange={handleChange}
          />
          <label className="form-check-label radio-label" htmlFor={item.id}>
            {item.label}
          </label>
        </React.Fragment>
      )}
      <div className="invalid-feedback">
        {errorMsg}
      </div>
    </div>
  </React.Fragment>
);

export default withHandlers(Radio);
