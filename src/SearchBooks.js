import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PopulateShelf from './PopulateShelf'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class searchBooks extends Component {
  static propTypes = {
    handleBookShelfChange: PropTypes.func
	}
  state={
    searchResults: [],
    query: ''
  }

  searchLibrary = (query) =>{
    BooksAPI.search(query).then((searchResult) => {
      this.setState({searchResults:searchResult})
    })
  }
  updateQuery = (query) => {
    this.setState ({ query: query.trim() })
    if(query.length>1){
      this.searchLibrary(query)
    }
  }

  render() {

    const { handleBookShelfChange } = this.props
    const { query, searchResults } = this.state

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
              <input
    						type='text'
    						placeholder='Search by title or author'
    						value={query}
    						onChange={(event) => this.updateQuery(event.target.value)}
    						/>
          </div>
        </div>
        <div className="search-books-results">
          <PopulateShelf
            books={ searchResults }
            handleBookShelfChange={handleBookShelfChange}
            />
        </div>
      </div>
    )
  }
}
export default searchBooks
