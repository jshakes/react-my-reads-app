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

    updateShelf = (book, newShelf) => {
      BooksAPI.update(book, newShelf)
      this.handleShelfChange(book, newShelf)
    }

    handleShelfChange = (book, shelf) => {
       if(this.bookExists(book) === true){
         this.setState({ books : this.updateBookState(book, shelf)})
       }
       else{
         this.setState({ books : this.appendBook(book, shelf)})
       }
    }

    bookExists = (newBook) => {
      return this.state.books.filter((book) => newBook.id === book.id).length > 0
    }

    appendBook = (book, shelf) => {
      book.shelf = shelf
      return this.state.books.concat([book])
    }

    updateBookState = (updatedBook, newShelf) => {
      return this.state.books.map((book) => {
        if (book.id === updatedBook.id){
          book.shelf = newShelf
        }
        return book
      })
    }

  render() {
    return (
      <div className="app">
          <Route exact path='/search' render={()=>(
            <AddBooks
              books={this.state.books}
              updateShelf={this.updateShelf}
              />
          )}/>
          <Route exact path='/' render={()=>(
            <ListBooks
              books={this.state.books}
              updateShelf={this.updateShelf}
              />
          )}/>
      </div>
    )
  }
}

export default BooksApp
