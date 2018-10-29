import React, { Fragment } from 'react'
import * as constants from '../constants'
import Square from './square'

const Worm = (props) => {
  return (
    <Fragment>
      <Square 
        backgroundColor={constants.RED}
        zIndex={'2'}
        top={constants.Y_OFFSET}
        left={constants.X_OFFSET}
      />
    </Fragment>
  )
}

export default Worm