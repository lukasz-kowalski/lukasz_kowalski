import React from 'react';

class ListSortButton extends React.Component {
  handleClick = () => {
    this.props.handleSortChange(this.props.name.toLowerCase());
  }

  render() {
    const { name } = this.props;
    return (
      <th scope="col">
      {name !== 'Actions' ?
        <button 
          className="th-button" 
          onClick={this.handleClick}
        >
          {name}
        </button> :
        name
      }
      </th>
    );
  }
}

export default ListSortButton;
