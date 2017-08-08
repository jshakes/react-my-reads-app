import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelves from './BookShelves'
import PropTypes from 'prop-types'

class ListBooks extends Component {
  static propTypes = {
		books: PropTypes.array.isRequired,
    handleBookShelfChange: PropTypes.func
	}

  render() {

    const { books, handleBookShelfChange } = this.props

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <BookShelves
              books={books}
              handleBookShelfChange={handleBookShelfChange}
              />
        </div>
        <div className="open-search">
          <Link
						to="/search"
						>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
