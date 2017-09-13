import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class SearchBooks extends Component {
  static propTypes = {
    bookshelves: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
    booksApiList: PropTypes.array.isRequired,
    searchBooks: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (q) => {
    this.setState({ query: q })
    this.props.searchBooks(q)
  }

  render() {
    const { bookshelves, onChangeShelf, booksApiList } = this.props
    const { query } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" >Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input 
              type="text"
              placeholder="Search by title or author"
              value={query} 
              onChange={(event) => this.updateQuery(event.target.value)}  />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {booksApiList.map((bookItem) => (
              <li key={bookItem.id}>
                <Book book={bookItem} categories={bookshelves} onChangeShelf={onChangeShelf} />                
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks