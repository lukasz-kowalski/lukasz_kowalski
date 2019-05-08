import React from 'react';

function withHandlers(WrappedComponent) {
  return class WithHandlers extends React.Component {
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
      this.props.validateForm(this.props.id, isValid);
    }
  
    validate = () => {
      if (this.props.isRequired) {
        this.isEmpty();
      }
    }
  
    render() {
      const newProps = {
        ...this.props,
        isValid: this.state.isValid,
        value: this.state.value,
        handleChange: this.handleChange,
        validate: this.validate
      }
      return <WrappedComponent {...newProps} />
    }
  }
}

export default withHandlers;
