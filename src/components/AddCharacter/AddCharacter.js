import React from 'react';
import TextInput from '../ui/TextInput';
import Select from '../ui/Select';
import Radio from '../ui/Radio';

const radioData = [
  {
    id: 'character-male',
    value: 'male',
    label: 'Male'
  },
  {
    id: 'character-female',
    value: 'female',
    label: 'Female'
  },
  {
    id: 'character-na',
    value: 'n/a',
    label: 'n/a'
  }
]

class AddCharacter extends React.Component {
  constructor(props) {
    super(props);
    this['character-nameRef'] = React.createRef();
    this['character-speciesRef'] = React.createRef();
    this['character-genderRef'] = React.createRef();
  }
  state = {
    species: [],
    doValidate: false,
    isFormValid: false,
    inputs: {
      'character-name': {
        value: '',
        isValid: false
      },
      'character-species': {
        value: '',
        isValid: false
      },
      'character-gender': {
        value: '',
        isValid: false
      },
      'character-homeland': {
        value: '',
        isValid: true
      }
    }
  }

  componentDidMount() {
    this.fetchSpecies();
  }

  fetchSpecies = async () => {
    const response = await fetch('http://localhost:3000/species');
    const species = await response.json();
    this.setState({
      species
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    await this.setState({
      doValidate: true
    });
    if (!this.state.isFormValid) {
      this.setState({
        doValidate: false
      });
      this.focusFirstInvalidField();
    } else {
      try {
        const response = await this.postData();
        if (response.ok) {
          this.setState({
            doValidate: false
          });
          this.props.history.push('/');
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  handleInputValue = (id, value) => {
    this.setState({
      inputs: {
        ...this.state.inputs,
        [id]: {
          ...this.state.inputs[id],
          value
        }
      }
    });
  }

  validateForm = async (id, isInputValid) => {
    const keys = Object.keys(this.state.inputs);
    await this.setState({
      inputs: {
        ...this.state.inputs,
        [id]: {
          ...this.state.inputs[id],
          isValid: isInputValid
        }
      }
    });
    const allInputsValid = keys.every(key => this.state.inputs[key].isValid)
    await this.setState({
      isFormValid: allInputsValid,
    });
  }

  focusFirstInvalidField = () => {
    const keys = Object.keys(this.state.inputs);
    let firstInvalid;
    for (let key of keys) {
      if (!this.state.inputs[key].isValid) {
        firstInvalid = key
        this[`${firstInvalid}Ref`].current.focus();
        return;
      }
    }
  }

  createPayload = () => {
    const payload = {
      id: Math.floor(Math.random() * 10000),
      name: this.state.inputs['character-name'].value,
      species: this.state.inputs['character-species'].value,
      gender: this.state.inputs['character-gender'].value,
      homeworld: this.state.inputs['character-homeland'].value
    };
    return payload;
  }

  postData = () => {
    const payload = this.createPayload();
    return fetch('http://localhost:3000/characters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
  }

  render() {
    return (
      <main className="container">
        <h1>Add new character</h1>

        <form onSubmit={this.handleSubmit}>
          <TextInput
            id="character-name"
            label="Character name"
            isRequired={true}
            errorMsg="This field is required."
            placeholder="Enter name"
            doValidate={this.state.doValidate}
            handleInputValue={this.handleInputValue}
            validateForm={this.validateForm}
            reference={this['character-nameRef']}
          />
          <Select 
            id="character-species"
            label="Choose character species"
            options={this.state.species}
            isRequired={true}
            errorMsg="This field is required."
            doValidate={this.state.doValidate}
            handleInputValue={this.handleInputValue}
            validateForm={this.validateForm}
            reference={this['character-speciesRef']}
          />
          <Radio
            radioData={radioData}
            id="character-gender"
            label="Choose character gender"
            isRequired={true}
            errorMsg="This field is required."
            doValidate={this.state.doValidate}
            handleInputValue={this.handleInputValue}
            validateForm={this.validateForm}
            reference={this['character-genderRef']}
          />
          <TextInput
            id="character-homeland"
            label="Character homeland"
            placeholder="Enter homeland"
            handleInputValue={this.handleInputValue}
          />
          <button type="submit" className={`btn btn-primary ${this.state.doValidate && 'disabled'}`}>Submit</button>
        </form>
      </main>
    );
  };
};

export default AddCharacter;
