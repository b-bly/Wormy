import React, { Component } from 'react'
import * as constants from '../constants'

const Square = (props) => {
  const style = {
    backgroundColor: props.backgroundColor,
    border: '2px solid gray',
    width: constants.CELLWIDTH,
    height: constants.CELLHEIGHT,
  }
  return (
    <div
      style={style}>
    </div>
  )
}

export default Square