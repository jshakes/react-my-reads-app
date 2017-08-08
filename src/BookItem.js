import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class BookItem extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfName: PropTypes.string,
    handleBookShelfChange: PropTypes.func
	}


  changeShelf = (book, newShelf) => {
    console.log(`Updating book: ${book.title} to ${newShelf}`)
    BooksAPI.update(book, newShelf)
    this.props.handleBookShelfChange(book, newShelf)
  }

  render() {
    const { shelfName, books } = this.props

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
                  <select value={book.shelf} onChange={(event) => this.changeShelf(book, event.target.value)}>
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
