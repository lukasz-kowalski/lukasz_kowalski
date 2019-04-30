import React, { Component, Fragment } from 'react';

class ListView extends Component {

  render() {
    return <Fragment>
      <h1>List View</h1>

      <div className="row">
        <div className="col-sm-6">
          <div className="form-group">
            <label htmlFor="searchInput" className="sr-only">Search</label>
            <input type="text" className="form-control" id="searchInput" placeholder="Search..." />
          </div>
        </div>
        <div className="col-sm-6 text-sm-right">
          <span className="btn btn-primary mb-3">Add New</span>
        </div>
      </div>

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
        <tr>
          <th scope="row">1</th>
          <td>Luke Skywalker</td>
          <td>Human</td>
          <td>Male</td>
          <td>Tatooine</td>
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
        <tr>
          <th scope="row">2</th>
          <td>R2-D2</td>
          <td>Droid</td>
          <td>n/a</td>
          <td>Naboo</td>
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
        </tbody>
      </table>

      <nav aria-label="Data grid navigation">
        <ul className="pagination justify-content-end">
          <li className="page-item disabled">
            <span className="page-link" tabIndex="-1">Previous</span>
          </li>
          <li className="page-item active">
            <span className="page-link">1 <span className="sr-only">(current)</span></span>
          </li>
          <li className="page-item">
            <span className="page-link">2</span>
          </li>
          <li className="page-item">
            <span className="page-link">Next</span>
          </li>
        </ul>
      </nav>

    </Fragment>;
  }
}
export default ListView;