import React from 'react';

class TextInput extends React.Component {
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
    const { id, label, isRequired, placeholder, errorMsg } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={id}>
          {label}{isRequired && <span className="blue">*</span>}
        </label>
        <input
          type="text"
          className={`form-control ${!this.state.isValid ? 'is-invalid' : ''}`}
          id={id}
          name={id} 
          placeholder={placeholder} 
          onChange={this.handleChange}
          onBlur={this.validate}
        />
        <div className="invalid-feedback">
          {errorMsg}
        </div>
      </div>
    );
  }
}

export default TextInput;
