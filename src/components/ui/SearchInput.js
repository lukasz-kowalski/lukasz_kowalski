import React from 'react';

class SearchInput extends React.Component {
  handleChange = event => {
    this.props.handleQueryChange(event);
  }

  render() {
    const { id, label, placeholder } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={id} className="sr-only">{label}</label>
        <input
          type="search"
          className="form-control" 
          id={id}
          placeholder={placeholder} 
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default SearchInput;
