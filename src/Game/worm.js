import React, { Fragment } from 'react'
import * as constants from '../helpers/constants'
import Square from './square'

// playerPosition: {
//   top: middleY,
//   left: middleX,
// },

const Worm = (props) => {
  const { playerPosition: { top, left }} = props
  return (
    <Fragment>
      <Square 
        backgroundColor={constants.RED}
        zIndex={'2'}
        top={top}
        left={left}
        border={false}
      />
    </Fragment>
  )
}

export default Worm