import React, { Component, Fragment } from 'react'
import { RED, UP, DOWN, LEFT, RIGHT, X_OFFSET, Y_OFFSET, BORDERWIDTH } from '../helpers/constants'

import Square from './square'

// playerPosition: {
//   top: middleY,
//   left: middleX,
// },

const WormBody = (props) => {
  const { playerPosition: { top, left } } = props

  return (
    <Fragment>
      <Square
        backgroundColor={RED}
        zIndex={'2'}
        top={top + Y_OFFSET + BORDERWIDTH}
        left={left + X_OFFSET + BORDERWIDTH}
        border={false}
      />
    </Fragment>
  )
}

export default WormBody