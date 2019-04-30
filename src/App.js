import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import ListView from './list-view/ListView';

class App extends Component {
  state = {
    isOpen: false
  };

  onToggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-3">
          <Link to="/" className="navbar-brand">Sonalake Task</Link>

          <button type="button"
                  onClick={() => this.onToggle()}
                  className={'navbar-toggler' + (!this.state.isOpen ? ' collapsed' : '')}
                  aria-expanded={this.state.isOpen}
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
          </button>

          <div className={'collapse navbar-collapse' + (this.state.isOpen ? ' show' : '')}>
            <ul className=" navbar-nav">
              <li className=" nav-item active">
                <Link to="/" className="nav-link">
                  List View
                  <span className=" sr-only">(current)</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container">
          <Route exact path="/" component={ListView} />
        </div>

      </div>
    );
  }
}

export default App;
