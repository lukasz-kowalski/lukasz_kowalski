import React from 'react';
import { NavLink } from 'react-router-dom';

class NavBar extends React.Component {
  state = {
    isOpen: false
  };

  onToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-3">
        <NavLink to="/" exact className="navbar-brand">Sonalake Task</NavLink>
        <button 
          type="button"
          onClick={this.onToggle}
          className={'navbar-toggler' + (!this.state.isOpen ? ' collapsed' : '')}
          aria-expanded={this.state.isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"/>
        </button>

        <div className={'collapse navbar-collapse' + (this.state.isOpen ? ' show' : '')}>
          <ul className=" navbar-nav">
            <li className=" nav-item active">
              <NavLink to="/" exact className="nav-link">
                List View
                <span className=" sr-only">(current)</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    ); 
  }
}

export default NavBar;
