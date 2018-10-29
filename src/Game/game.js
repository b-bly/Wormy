import React, { Component, Fragment } from 'react';
import * as constants from '../constants'
import Board from './board'
import Worm from './worm'

export default class Game extends Component {
  constructor() {
    super()
  }

  render() {
    console.log(constants.WINDOWHEIGHT)
    return (
      <div>
        <Board />
        <Worm />
      </div>
    )
  }
}