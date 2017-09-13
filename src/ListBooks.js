import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'

class ListBooks extends Component {
  static propTypes = {
    bookshelves: PropTypes.array.isRequired,
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  render() {
    const { bookshelves, books, onChangeShelf } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {bookshelves.map((bookshelf) => (
              <Bookshelf 
                key={bookshelf.type} 
                title={bookshelf.title} 
                categories={bookshelves} 
                onChangeShelf={onChangeShelf}
                books={books.filter((book) => book.shelf === bookshelf.type)} />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search" >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks