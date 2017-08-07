import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class PopulateShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfName: PropTypes.string,
    handleBookShelfChange: PropTypes.func
	}


  onUpdateShelf = (book, newShelf) => {
    console.log(`Updating book: ${book} to ${newShelf}`)
    BooksAPI.update(book, newShelf)
    this.props.handleBookShelfChange(book.id, newShelf)
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
        {shelfItems.map((books) =>
          <li key={books.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${books.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                  <select value={books.shelf} onChange={(event) => this.onUpdateShelf(books, event.target.value)}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{books.title}</div>
              <div className="book-authors">{books.authors.join(', ')}</div>
            </div>
          </li>
        )}
      </ol>
      )
    }
}
export default PopulateShelf
