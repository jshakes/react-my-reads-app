import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelves from './BookShelves'
import PropTypes from 'prop-types'

class ListBooks extends Component {
  static propTypes = {
		books: PropTypes.array.isRequired
	}

  render() {

    const { books } = this.props

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <BookShelves
              books={books}
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
