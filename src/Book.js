import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  state = {
    category: this.props.book.shelf
  }

  onChangeOption = (event) => {
    this.setState({category: event.target.value});
    this.props.onChangeShelf(this.props.book, event.target.value)
  }

  render() {
    const { book, categories } = this.props

    const bckImg = book.imageLinks && book.imageLinks.thumbnail ? "url("+book.imageLinks.thumbnail+")" : ""

    return (
      <div className="book">
        <div className="book-top">          
          <Link to={{
            pathname: `/book/${book.id}`,
            search: `?prev=${window.location.pathname}`
          }} >
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: bckImg }}></div>
          </Link>
          <div className="book-shelf-changer">
            <select value={this.state.category} onChange={this.onChangeOption}>
              <option value="" disabled>Move to...</option>
              {categories.map((category) => (
                <option key={category.type} value={category.type}>{category.title}</option>
              ))}              
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
      </div>
    )
  }
}