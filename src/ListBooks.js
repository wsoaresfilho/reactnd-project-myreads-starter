import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'

const bookshelves = [
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

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  render() {
    const { books } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {bookshelves.map((bookshelf) => (
              <Bookshelf key={bookshelf.type} title={bookshelf.title} books={books.filter((book) => book.shelf === bookshelf.type)} />
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