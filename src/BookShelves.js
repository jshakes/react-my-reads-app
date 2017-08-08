import React, { Component }  from 'react'
import BookItem from './BookItem'
import PropTypes from 'prop-types'

class BookShelves extends Component{
  static propTypes = {
		books: PropTypes.array.isRequired
	}

  render() {

    const { books } = this.props

    let shelves = {
      currentlyReading: "Currently Reading",
      wantToRead: "Want to Read",
      read: "Read"
     }

    return(
      <div>
        {Object.keys(shelves).map((key) => {
          return (
            <div className="bookshelf" key={key.toString()}>
              <h2 className="bookshelf-title" key={key}>{shelves[key]}</h2>
              <div className="bookshelf-books">
                <BookItem
                  books={ books }
                  shelfName={ key }
                  />
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
export default BookShelves
