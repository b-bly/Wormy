import React, { Component } from 'react';
import * as constants from './constants'

export default class Game extends Component {
  constructor() {
    super()
  }

  render() {
    console.log(constants.WINDOWHEIGHT)
    return (
      <div>
        Hello
      </div>
    )
  }
}