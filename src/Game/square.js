import React, { Component } from 'react'
import { BORDERWIDTH, CELLHEIGHT, CELLWIDTH } from '../helpers/constants'

const Square = (props) => {
  const style = {
    backgroundColor: props.backgroundColor,
    border: props.border ? BORDERWIDTH + 'px solid gray' : '',
    width: CELLWIDTH,
    height: CELLHEIGHT,
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