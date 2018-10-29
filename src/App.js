import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import Game from './game'
import Board from './Game/board'

class App extends Component {
  render() {
    return (
      <div className="App" style={{ backgroundColor: 'black', height: '100vh' }}>
        <h1 style={{ color: 'white' }}>Wormy</h1>
        <Board />
      </div>
    );
  }
}

export default App;
