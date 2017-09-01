import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookshelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired
  }

  render() {
    const { books, title } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((bookItem) => (
              <li key={bookItem.id}>
                <Book book={bookItem} />                
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf