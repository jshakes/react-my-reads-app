import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookItem from './BookItem'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class AddBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    handleBookShelfChange: PropTypes.func
	}
  state={
    searchResults: [],
    query: ''
  }

  searchLibrary = (query) =>{
    BooksAPI.search(query, 20).then((searchResult) => {
      //console.log(this.compareSearchAgainstBooks(searchResult).length)
      this.setState({
        searchResults: this.compareSearchAgainstBooks(searchResult)
      })
    })
  }

  compareSearchAgainstBooks = (searchResult) => {
    console.log(searchResult.length)
    return searchResult.map(resultBook => {
      resultBook.shelf = 'default'
      // console.log(`Map Book: ${resultBook.title}`)
      this.props.books.map(book =>{
        // console.log(`Against: ${book.title}`)
        if (resultBook.id === book.id){
          resultBook.shelf = book.shelf
          console.log(`RESULT! Matching Book: ${resultBook.title} of shelf result:${resultBook.shelf} Book:${book.shelf}`)
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

    const { handleBookShelfChange } = this.props
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
            handleBookShelfChange={handleBookShelfChange}
            />
        </div>
      </div>
    )
  }
}
export default AddBooks
