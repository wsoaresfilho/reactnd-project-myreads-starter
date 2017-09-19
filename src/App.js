import React from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import BookDetails from './BookDetails'
import * as BooksAPI from './BooksAPI'
import sortBy from 'sort-by'
import './App.css'

const bookshelvesList = [
  {
    "title": "Currently Reading",
    "type": "currentlyReading"
  },
  {
    "title": "Want to Read",
    "type": "wantToRead"
  },
  {
    "title": "Read",
    "type": "read"
  }
]

class BooksApp extends React.Component {
  state = {
    booksUserList: [],
    booksApiList: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ booksUserList: books })
    })
  }

  updateBooksList = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      const newBooksList = this.state.booksUserList.map((b) => {
        if(b.id === book.id) {
          b.shelf = shelf
        }
        return b
      })
      this.setState({ booksUserList: newBooksList })
    })
  }
    

  onSelectCategory = (book, shelf) => {
    if(this.state.booksUserList.some((item) => {return item.id === book.id})) {
      this.updateBooksList(book, shelf)
    } else {
      BooksAPI.get(book.id).then((newBook) => {
        this.setState((prevState) => ({
          booksUserList: prevState.booksUserList.concat(newBook)
        }))
        this.updateBooksList(book, shelf)
      })
    }      
  }

  searchBooks = (query) => {
    BooksAPI.search(query).then((books) => {
      if(!books || books.error) {
        this.setState({ booksApiList: [] })
      } else {
        const booksApiListUpdated = books.map((book) => {
          this.state.booksUserList.forEach((b) => {
            if(book.id === b.id) {
              book.shelf = b.shelf
            } else {
              book.shelf = "none"
            }
          })
          return book
        })
        this.setState({ booksApiList: booksApiListUpdated })
      }              
    })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBooks 
            bookshelves={bookshelvesList} 
            onChangeShelf={this.onSelectCategory}
            booksApiList={this.state.booksApiList.sort(sortBy('title'))}
            searchBooks={this.searchBooks} />
        )}/>

        <Route exact path='/' render={() => (       
          <ListBooks 
            bookshelves={bookshelvesList} 
            books={this.state.booksUserList.sort(sortBy('title'))}
            onChangeShelf={this.onSelectCategory} />
        )}/>

        <Route path='/book/:id' render={({match}) => (
          <BookDetails bookId={ match.params.id } /> 
        )} />
      </div>
    )
  }
}

export default BooksApp
