import React from 'react';
import { Link } from 'react-router-dom';

class ListItem extends React.Component {
  handleDelete = () => {
    this.props.deleteCharacter(this.props.character.id);
  }

  render() {
    const { character } = this.props;
    return (
      <tr key={character.name}>
        <th scope="row">{character.id}</th>
        <td>{character.name}</td>
        <td>{character.species}</td>
        <td>{character.gender}</td>
        <td>{character.homeworld}</td>
        <td>
          <div className="btn-group btn-group-sm" role="group" aria-label="Actions">
            <button type="button" className="btn btn-secondary">
              <Link 
                to={{
                  pathname: `/edit-character/${character.id}`,
                  state: character
                }}
              >
                <i className="fa fa-pencil" aria-hidden="true"/> Edit
              </Link>
            </button>
            <button type="button" className="btn btn-danger" onClick={this.handleDelete}>
              <i className="fa fa-trash-o" aria-hidden="true"/> Remove
            </button>
          </div>
        </td>
      </tr>
    );
  }
}

export default ListItem;
