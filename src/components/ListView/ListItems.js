import React from 'react';
import ListItem from './ListItem';
import ListSortButton from './ListSortButton';

const buttonNames = [
  'Id', 'Name', 'Species', 'Gender', 'Homeworld', 'Actions'
]

const ListItems = ({ characters, deleteCharacter, handleSortChange }) => (
  <table className="table table-bordered table-hover">
    <thead className="thead-light">
    <tr>
      {buttonNames.map(item => 
        <ListSortButton
          key={item}
          handleSortChange={handleSortChange}
          name={item}
        />
      )}
    </tr>
    </thead>
    <tbody>
    {characters.map(character =>
      <ListItem
        key={character.name + character.id}
        character={character} 
        deleteCharacter={deleteCharacter}
      />
    )}
    </tbody>
  </table>
);

export default ListItems;
