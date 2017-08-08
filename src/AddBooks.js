import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookItem from './BookItem'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class AddBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
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
    })
  }

  compareSearchAgainstBooks = (searchResult) => {
    console.log(searchResult.length)
    return searchResult.map(resultBook => {
      resultBook.shelf = 'default'
      this.props.books.map(book =>{
        if (resultBook.id === book.id){
          resultBook.shelf = book.shelfconsole.log(`RESULT! Matching Book: ${resultBook.title} of shelf result:${resultBook.shelf} Book:${book.shelf}`)
        }
        return resultBook
      })
      return resultBook
    })
  }

  updateQuery = (query) => {
    this.setState ({ query: query.trim() })
    if(query.length>1){
      this.searchLibrary(query)
    }
  }

  render() {

    const { query, searchResults } = this.state

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
            />
        </div>
      </div>
    )
  }
}
export default AddBooks
