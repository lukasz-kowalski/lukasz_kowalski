import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import debounce from '../../utils/debounce';
import ListItems from './ListItems';
import ListPagination from './ListPagination';
import SearchInput from '../ui/SearchInput';

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
    searchParam: '',
    sortParam: ''
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

  setSearchToQuery = () => {
    const initialQuery = this.getInitialQuery();
    const { searchParam } = this.state;
    if (searchParam) {
      return '_page=1' + searchParam;
    }
    return initialQuery;
  }

  setSortToQuery = () => {
    const queryWithSearch = this.setSearchToQuery();
    const { sortParam } = this.state;
    if (sortParam) {
      return queryWithSearch + sortParam;
    }
    return queryWithSearch;
  }

  setURL = retry => {
    const { params } = this.props.match;
    const { history } = this.props;
    const { pathname } = this.props.location;
    const currentPage = params.page ? params.page : '1';
    let newPathname = pathname;
    if (retry) {
      const pathArr = newPathname.split('/');
      pathArr[2] -= 1;
      newPathname = pathArr.join('/');
    }
    const redirectedPathname = newPathname === '/' ? `/characters/${currentPage}` : newPathname;
    const initialURL = `${redirectedPathname}?${this.setSortToQuery()}`;
    history.push(initialURL);
  }

  fetchData = async retry => {
    this.setURL(retry);
    try {
      const response = await fetch(`http://localhost:3000/characters?${this.setSortToQuery()}`);
      const { firstPage, lastPage } = await this.parseHeaders(response.headers);
      const characters = await response.json();
      await this.setState({
        characters,
        firstPage,
        lastPage
      });
      if (this.state.characters.length === 0 && this.state.currentPage !== '1') {
        this.setURL(true);
      }
    } catch (err) {
      console.log(err, err.stack);
    }
  }

  parseHeaders = headers => {
    const paginationHeaders = headers.get('Link') ? headers.get('Link').split(',') : []; // splitting header string into array
    const first = paginationHeaders[0];
    const last = paginationHeaders[2];
    const firstPage = first ? first.match(/page=(\d+)/)[1] : ''; // extracting first page number
    const lastPage = last ? last.match(/page=(\d+)/)[1] : ''; // extracting last page number
    return { firstPage, lastPage }
  }

  handleQueryChange = event => {
    const query = event.target ? event.target.value : '';
    const searchParam = query ? `&q=${query}` : '';
    this.setState({
      searchParam
    });
    this.fetchSearchData();
  }

  handleSortChange = async name => {
    const sortParam = name ? `&_sort=${name}&_order=asc` : '';
    await this.setState({
      sortParam
    });
    this.fetchData();
  }

  fetchSearchData = () => {
    this.fetchData();
  }

  deleteCharacter = async id => {
    const response = await fetch(`http://localhost:3000/characters/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      this.fetchSearchData();
    }
  }

  render() {
    const { params } = this.props.match;
    const { characters, currentPage, firstPage, lastPage } = this.state;
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
            <SearchInput
              id="searchInput"
              placeholder="Search characters..."
              label="Search characters..."
              handleQueryChange={this.handleQueryChange}
            />
          </div>
          <div className="col-sm-6 text-sm-right">
            <Link to='/add-character' className="btn btn-primary mb-3">Add New</Link>
          </div>
        </div>

        <ListItems 
          characters={characters}
          deleteCharacter={this.deleteCharacter}
          handleSortChange={this.handleSortChange}
        />

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