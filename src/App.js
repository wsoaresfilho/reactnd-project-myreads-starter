import React from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    // TO-DO
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBooks />
        )}/>

        <Route exact path='/' render={() => (       
          <ListBooks />
        )}/>
      </div>
    )
  }
}

export default BooksApp
