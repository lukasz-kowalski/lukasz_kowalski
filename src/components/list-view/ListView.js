import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import debounce from '../../utils/debounce';
import ListItems from './ListItems';
import ListPagination from './ListPagination';

import './ListView.css';

class ListView extends Component {
  constructor(props) {
    super(props);
    this.fetchQuery = debounce(this.fetchQuery.bind(this), 200);
  }
  state = {
    characters: [],
    currentPage: '',
    firstPage: '',
    lastPage: '',
    queryParam: ''
  }

  async componentDidMount() {
    this.fetchInitialData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.page !== this.props.match.params.page) {
      this.fetchInitialData()
    }
  }

  fetchInitialData = async () => {
    const { params } = this.props.match;  // get page from params
    const currentPage = params.page ? params.page : '1'; // if lack set to 1
    const pageParam = `_page=${currentPage}`;
    const response = await this.fetchData(pageParam);
    const { firstPage, lastPage } = await this.parseHeaders(response.headers)
    const characters = await response.json()
    this.setState({
      characters,
      currentPage,
      firstPage,
      lastPage
    })
  }

  fetchData = async params => {
    const response = await fetch(`http://localhost:3000/characters?${params}`);
    return response;
  }

  parseHeaders = headers => {
    const paginationHeaders = headers.get('Link').split(',') // splitting header string into array
    const first = paginationHeaders.filter(header => header.indexOf('first') > 0)[0]; // filtering array for first page
    const last = paginationHeaders.filter(header => header.indexOf('last') > 0)[0]; // filtering array for last page
    const firstPage = first ? first.slice(first.indexOf('=') + 1, first.indexOf('>')) : ''; // extracting first page number
    const lastPage = last ? last.slice(last.indexOf('=') + 1, last.indexOf('>')) : ''; // extracting last page number
    return { firstPage, lastPage }
  }

  handleChange = async event => {
    const query = event.target ? event.target.value : '';
    const queryParam = query ? `&q=${query}` : '';
    this.fetchQuery(queryParam);
  }

  fetchQuery = async queryParam => {
    if (queryParam) {
      const response = await this.fetchData(queryParam);
      const characters = await response.json();
      this.setState({
        characters,
        currentPage: '1',
        firstPage: '',
        lastPage: ''
      });
    } else {
      this.fetchInitialData();
    }
  }

  render() {
    const { characters ,currentPage, firstPage, lastPage } = this.state;
    const numCurrentPage = Number(currentPage)
    const isFirstPage = currentPage === firstPage;
    const isLastPage = currentPage === lastPage;

    const paginationData = []
    for (let i = 1; i <= Number(lastPage); i++) {  // creating pagination items based on
      paginationData.push(                            // number of available pages from api
          <li key={'nav-li' + i} className="page-item">
          <NavLink
            to={`/characters/${i}`}
            className={`page-link ${numCurrentPage === i && 'active'}`}
          >
            {i} <span className="sr-only">{numCurrentPage === i && '(current)'}</span>
          </NavLink>
        </li>
      )
    }

    return (
      <div className="container">
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
            <span className="btn btn-primary mb-3">Add New</span>
          </div>
        </div>

        <ListItems characters={characters} />            
        {paginationData.length > 0 && <ListPagination
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
          numCurrentPage={numCurrentPage}
          paginationData={paginationData} 
          queryParam={this.state.queryParam}
        />}
      </div>
    );
  }
}
export default ListView;