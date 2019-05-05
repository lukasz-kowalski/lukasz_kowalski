import React from 'react';

class Select extends React.Component {
  state = {
    isValid: true,
    value: ''
  }

  componentDidUpdate(prevProps) {
    if (prevProps.doValidate !== this.props.doValidate && this.props.doValidate === true) {
      this.validate()
    }
  }

  handleChange = async event => {
    const value = event.target.value;
    await this.setState({
      value
    });
    this.validate();
    this.props.handleInputValue(this.props.id, this.state.value);
  }
  
  isEmpty = () => {
    const isValid = this.state.value.length > 0;
    this.setState({
      isValid
    });
    this.props.validateForm(isValid);
  }

  validate = () => {
    if (this.props.isRequired) {
      this.isEmpty();
    }
  }

  render() {
    const { id, label, options, isRequired, errorMsg} = this.props;
    return (
      <div className="form-group">
        <label htmlFor={id}>
          {label}{isRequired && <span className="blue">*</span>}
        </label>
        <select 
          className={`form-control ${!this.state.isValid ? 'is-invalid' : ''}`}
          id={id} 
          name={id}
          onChange={this.handleChange}
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
  }
}

export default Select;
