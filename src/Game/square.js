import React, { Component } from 'react'
import * as constants from '../helpers/constants'

const Square = (props) => {
  const style = {
    backgroundColor: props.backgroundColor,
    border: props.border ? '2px solid gray' : '',
    width: constants.CELLWIDTH,
    height: constants.CELLHEIGHT,
    zIndex: props.zIndex,
    position: 'absolute',
    top: props.top,
    left: props.left,
  }
  return (
    <div
      style={style}>
    </div>
  )
}

export default Square