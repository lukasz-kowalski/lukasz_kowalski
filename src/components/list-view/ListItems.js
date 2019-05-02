import React from 'react';

const ListItems = ({ characters }) => (
  <table className="table table-bordered table-hover">
    <thead className="thead-light">
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">Species</th>
      <th scope="col">Gender</th>
      <th scope="col">Homeworld</th>
      <th scope="col">Actions</th>
    </tr>
    </thead>
    <tbody>
    {characters.map((character, index) => 
      <tr key={character.name}>
        <th scope="row">{index + 1}</th>
        <td>{character.name}</td>
        <td>{character.species}</td>
        <td>{character.gender}</td>
        <td>{character.homewordl}</td>
        <td>
          <div className="btn-group btn-group-sm" role="group" aria-label="Actions">
            <button type="button" className="btn btn-secondary">
              <i className="fa fa-pencil" aria-hidden="true"/> Edit
            </button>
            <button type="button" className="btn btn-danger">
              <i className="fa fa-trash-o" aria-hidden="true"/> Remove
            </button>
          </div>
        </td>
      </tr>
    )}
    </tbody>
  </table>
);

export default ListItems;
