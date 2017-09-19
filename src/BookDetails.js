import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

export default class BookDetails extends Component {
  static propTypes = {
    bookId: PropTypes.string.isRequired
  }

  state = {
    prevpath:  '',
    book: {}
  }

  componentWillMount() {
    const prev = window.location.search.replace("?prev=", "")
    this.setState({prevpath: prev})
  }

  componentDidMount() {
    BooksAPI.get(this.props.bookId).then((book) => {
      this.setState({ book })
    })
  }

  render() {
    const { prevpath, book } = this.state

    return (
      <div className="book-details">
        <div className="list-books-title">
          <h1>MyReads: Book Details</h1>
        </div>
        <Link className="back-link" to={prevpath} >Back</Link>
        <div className="book-details-infos">
          <div className="row">
            {book.imageLinks && (
              <div className="info-lines">
                <img className="book-image" src={book.imageLinks.thumbnail ? book.imageLinks.thumbnail : book.imageLinks.smallThumbnail} alt="Book Cover" />
              </div>
            )}
            {book.title && (
              <div className="info-lines">
                <label>Title:</label><span>{book.title}</span>
              </div>
            )}
            {book.subtitle && (
              <div className="info-lines">
                <label>Subtitle:</label><span>{book.subtitle}</span>
              </div>
            )}
            {book.authors && (
              <div className="info-lines">
                <label>Authors:</label><span>{book.authors.join(', ')}</span>
              </div>
            )}
            {book.publisher && (
              <div className="info-lines">
                <label>Publisher:</label><span>{book.publisher}</span>
              </div>
            )}
            {book.publishedDate && (
              <div className="info-lines">
                <label>Published Date:</label><span>{book.publishedDate}</span>
              </div>
            )}
            {book.pageCount && (
              <div className="info-lines">
                <label>Page Count:</label><span>{book.pageCount}</span>
              </div>
            )}
            {book.averageRating && (
              <div className="info-lines">
                <label>Rating:</label><span>{book.averageRating}</span>
              </div>
            )}
            {book.description && (
              <div className="info-lines description">
                <label>Description:</label><span>{book.description}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}