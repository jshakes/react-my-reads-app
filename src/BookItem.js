import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookItem extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired,
    shelfName: PropTypes.string
	}

  render() {
    const { shelfName, books, updateShelf } = this.props

    let shelfItems
    if(shelfName){
      shelfItems = books.filter((books) => books.shelf === shelfName)
    }
    else{
      shelfItems = books
    }

    return(
      <ol className="books-grid">
        {shelfItems.map((book) =>
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                  <select value={book.shelf} onChange={(event) => updateShelf(book, event.target.value)}>
                    <option value="default" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors ? book.authors.join(', ') : 'Unknown'}</div>
            </div>
          </li>
        )}
      </ol>
      )
    }
}
export default BookItem
