import React from 'react'
import * as constants from '../constants'
import Square from './square'

const Board = (props) => {
  const board = Array(constants.CELLSIZE).fill('').map((el, i, arr) =>
    <div key={i.toString()} style={{
      display: 'inline-block'
    }}>
      {arr.map((el, j) =>
        <Square key={j.toString()}
          // placeholder until props pass the correct color
          backgroundColor={constants.BLACK} />
      )}
    </div>
  );

  return (
    <div style={{ display: 'block' }}>
      {board}
    </div>
  )
}

export default Board