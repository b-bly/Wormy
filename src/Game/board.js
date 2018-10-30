import React from 'react'
import * as constants from '../helpers/constants'
import Square from './square'
import { relative } from 'path';



const Board = (props) => {
  const board = Array(constants.CELLSIZE).fill('').map((el, i, arr) => {
    return (
      // <div key={i.toString()} style={{
      //   display: 'inline-block',
      //   position: 'relative'
      // }}>
        arr.map((el, j) => {
          return (
            <Square key={j.toString()}
              // placeholder until props pass the correct color
              backgroundColor={constants.BLACK}
              top={i*constants.CELLHEIGHT + constants.Y_OFFSET}              
              left={j * constants.CELLWIDTH + constants.X_OFFSET}
              zIndex='0'
              border={true}
            />
          )
        })
      // </div>
    )
  });

  return (
    <div style={{ display: 'block' }}>
      {board}
    </div>
  )
}

export default Board