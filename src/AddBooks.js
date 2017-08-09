import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookItem from './BookItem'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class AddBooks extends Component {
  static propTypes = {
    updateShelf: PropTypes.func.isRequired
	}
  state={
    searchResults: [],
    query: ''
  }

  searchLibrary = (query) =>{
    BooksAPI.search(query, 20).then((searchResult) => {
      this.setState({
        searchResults: this.compareSearchAgainstBooks(searchResult)
      })
    }).catch(() => {
      console.log('No Results Found!')
      this.setState({ searchResults: [] })
    })
  }

  compareSearchAgainstBooks = (searchResult) => {
    return searchResult.map(resultBook => {
      resultBook.shelf = 'default'
      this.props.books.map(book =>{
        if (resultBook.id === book.id){
          resultBook.shelf = book.shelf
        }
        return resultBook
      })
      return resultBook
    })
  }

  updateQuery = (query) => {
    this.setState ({ query: query.trim() })
    this.searchLibrary(query)
  }

  render() {

    const { query, searchResults } = this.state
    const { updateShelf } = this.props

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
              <input
    						type='text'
    						placeholder='Search by title or author'
    						value={query}
    						onChange={(event) => this.updateQuery(event.target.value)}
    						/>
          </div>
        </div>
        <div className="search-books-results">
          <BookItem
            books={ searchResults }
            updateShelf={updateShelf}
            />
        </div>
      </div>
    )
  }
}
export default AddBooks
