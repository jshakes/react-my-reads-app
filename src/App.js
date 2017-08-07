import React from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
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

  handleBookShelfChange = (id, shelf) => {
    this.setState(state => {
      let newBooks = state.books.map(book => {
        if (book.id === id) {
            book.shelf = shelf;
        }
        return book;
      });
      return {books: newBooks};
    });
  }

  render() {
    return (
      <div className="app">
          <Route exact path='/search' render={()=>(
            <SearchBooks
              books={this.state.books}
              query={this.state.query}
              searchLibrary={this.searchLibrary}
              handleBookShelfChange={this.handleBookShelfChange}
              />
          )}/>
          <Route exact path='/' render={()=>(
            <ListBooks
              books={this.state.books}
              onUpdateShelf={this.onUpdateShelf}
              handleBookShelfChange={this.handleBookShelfChange}
              />
          )}/>
      </div>
    )
  }
}

export default BooksApp
