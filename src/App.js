import React from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import AddBooks from './AddBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
		BooksAPI.getAll().then((books) => {
			this.setState({ books })
		})
	}

  handleBookShelfChange = (newAddition, shelf) => {
    this.setState(state => {
      let newBooks = state.books.map(book => {
        if (book.id === newAddition.id) {
            book.shelf = newAddition.shelf
            console.log(`Looks like this one is on the list, changing shelf to ${newAddition.shelf}`)
        }
        else{
          console.log("another one")
          this.appendBook(newAddition)
        }
      })
      return {books: newBooks};
    })
  }



  render() {
    return (
      <div className="app">
          <Route exact path='/search' render={()=>(
            <AddBooks
              books={this.state.books}
              />
          )}/>
          <Route exact path='/' render={()=>(
            <ListBooks
              books={this.state.books}
              />
          )}/>
      </div>
    )
  }
}

export default BooksApp
