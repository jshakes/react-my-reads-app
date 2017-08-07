import React, { Component }  from 'react'
import PopulateShelf from './PopulateShelf'
import PropTypes from 'prop-types'

class CreateShelves extends Component{
  static propTypes = {
		books: PropTypes.array.isRequired,
    handleBookShelfChange: PropTypes.func
	}

  render() {

    const { books, handleBookShelfChange } = this.props

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
                <PopulateShelf
                  books={ books }
                  shelfName={ key }
                  handleBookShelfChange={handleBookShelfChange}
                  />
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
export default CreateShelves
