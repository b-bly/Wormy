import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import Game from './game'
import Game from './Containers/game'

class App extends Component {
  render() {
    return (
      <div className="App" style={{ backgroundColor: 'black', height: '100vh' }}>
        <h1 style={{ color: 'white', margin: '0' }}>Wormy</h1>
        <Game />
      </div>
    );
  }
}

export default App;
