import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import debounce from '../../utils/debounce';
import ListItems from './ListItems';
import ListPagination from './ListPagination';

import './ListView.css';

class ListView extends Component {
  constructor(props) {
    super(props);
    this.fetchSearchData = debounce(this.fetchSearchData, 200);
  }

  state = {
    characters: [],
    currentPage: '',
    firstPage: '',
    lastPage: '',
    searchParam: ''
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.page !== this.props.match.params.page) {
      this.fetchData();
    }
  }

  getInitialQuery = () => {
    const { params } = this.props.match;
    const currentPage = params.page ? params.page : '1';
    const initialQuery = `_page=${currentPage}`;
    this.setState({
      currentPage
    })
    return initialQuery;
  }

  getUpdatedQuery = () => {
    const initialQuery = this.getInitialQuery();
    const { searchParam } = this.state;
    if (searchParam) {
      return initialQuery + searchParam;
    }
    return initialQuery;
  }

  setURL = () => {
    const { params } = this.props.match;
    const { history } = this.props;
    const { pathname } = this.props.location;
    const currentPage = params.page ? params.page : '1';
    const redirectedPathname = pathname === '/' ? `/characters/${currentPage}` : pathname;
    const initialURL = `${redirectedPathname}?${this.getUpdatedQuery()}`;
    history.push(initialURL);
    return initialURL;
  }

  fetchData = async () => {
    this.setURL();
    try {
      const response = await fetch(`http://localhost:3000/characters?${this.getUpdatedQuery()}`);
      const { firstPage, lastPage } = await this.parseHeaders(response.headers);
      const characters = await response.json();
      this.setState({
        characters,
        firstPage,
        lastPage
      })
    } catch (err) {
      console.log(err);
    }
  }

  parseHeaders = headers => {
    const paginationHeaders = headers.get('Link').split(',') // splitting header string into array
    const first = paginationHeaders[0];
    const last = paginationHeaders[2];
    const firstPage = first ? first.match(/page=(\d+)/)[1] : ''; // extracting first page number
    const lastPage = last ? last.match(/page=(\d+)/)[1] : ''; // extracting last page number
    return { firstPage, lastPage }
  }

  handleChange = event => {
    const query = event.target ? event.target.value : '';
    const searchParam = query ? `&q=${query}` : '';
    this.setState({
      searchParam
    })
    this.fetchSearchData();
  }

  fetchSearchData = () => {
    this.fetchData();
  }

  render() {
    const { params } = this.props.match;
    const { characters ,currentPage, firstPage, lastPage } = this.state;
    const numCurrentPage = Number(params.page);
    const isFirstPage = currentPage === firstPage;
    const isLastPage = currentPage === lastPage;

    const paginationData = []
    for (let i = 1; i <= Number(lastPage); i++) {  // creating pagination items based on
      paginationData.push(                            // number of available pages from api
          <li key={'nav-li' + i} className="page-item">
          <NavLink
            to={{ pathname: `/characters/${i}`, search: `_page=${i}`}}
            className={`page-link ${numCurrentPage === i ? 'active' : ''}`}
          >
            {i} <span className="sr-only">{numCurrentPage === i ? '(current)' : ''}</span>
          </NavLink>
        </li>
      )
    }

    return (
      <main className="container">
        <h1>List View</h1>

        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="searchInput" className="sr-only">Search</label>
              <input
                type="text" 
                className="form-control" 
                id="searchInput"
                placeholder="Search..." 
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="col-sm-6 text-sm-right">
            <Link to='/add-character' className="btn btn-primary mb-3">Add New</Link>
          </div>
        </div>

        <ListItems characters={characters} />            
        {paginationData.length > 0 && <ListPagination
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
          numCurrentPage={numCurrentPage}
          paginationData={paginationData} 
        />}
        {this.state.characters.length <= 0 && 
          <p>No Results Found</p>
        }
      </main>
    );
  }
}
export default ListView;