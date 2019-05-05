import React from 'react';
import TextInput from '../ui/TextInput';
import Select from '../ui/Select';

class AddCharacter extends React.Component {
  state = {
    species: [],
    doValidate: false,
    isFormValid: false,
    'character-name': {
      value: ''
    },
    'character-species': {
      value: ''
    },
    'character-gender': {
      value: ''
    },
    'character-homeland': {
      value: ''
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
      [id]: {
        value
      }
    });
  }

  validateForm = isInputValid => {
    if (!isInputValid) {
      this.setState({
        isFormValid: false,
      });
    }
  }

  createPayload = () => {
    const payload = {
      id: Math.floor(Math.random() * 1000),
      name: this.state['character-name'].value,
      species: this.state['character-species'].value,
      gender: this.state['character-gender'].value,
      homeworld: this.state['character-homeland'].value
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
          />
          <div className="form-check">
          </div>
          <label htmlFor="character-gender">Choose character gender<span className="blue">*</span></label>
          <div className="form-check" id="character-gender" aria-label="choose character gender">
            <input className="form-check-input" type="radio" name="character-gender" id="character-male" value="male" />
            <label className="form-check-label radio-label" htmlFor="character-male">
              Male
            </label>
            <input className="form-check-input is-invalid" type="radio" name="character-gender" id="character-female" value="female" />
            <label className="form-check-label radio-label" htmlFor="character-female">
              Female
            </label>
            <input className="form-check-input" type="radio" name="character-gender" id="character-na" value="n/a" />
            <label className="form-check-label radio-label" htmlFor="character-na">
              n/a
            </label>
            <div className="invalid-feedback">
              This field is required.
            </div>
          </div>
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
