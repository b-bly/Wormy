import React, { Component, Fragment } from 'react';
import { CELLWIDTH, X_OFFSET, Y_OFFSET, BORDERWIDTH, CELLHEIGHT, INTERVAL, WINDOWWIDTH, WINDOWHEIGHT, PLAYERWIDTH, PLAYERHEIGHT, CELLSIZE, UP, DOWN, LEFT, RIGHT, Y_VALUES, X_VALUES, TOTAL_CELL_WIDTH, TOTAL_CELL_HEIGHT } from '../helpers/constants'
import Board from '../Game/board'
import Worm from '../Game/worm'


const getDefaultState = () => {
  const middle = (Math.floor(CELLSIZE / 2)) - 1
  const middleX = middle * CELLWIDTH + BORDERWIDTH / 2
  const middleY = middle * CELLHEIGHT + BORDERWIDTH / 2

  return {
    playerPosition: {
      top: 0,
      left: middleX,

    },
    playerTurningDirection: null, // {direction: String, turnThreshold: Number}
    playerDirection: LEFT,
    playerSpeed: 8,
    score: 0,
  }
}

const OPPOSITE_DIRECTIONS = {
  UP: DOWN,
  DOWN: UP,
  LEFT: RIGHT,
  RIGHT: LEFT,
}

//   const getDefaultState = ({ boardSize, playerSize, highScore = 0 }) => {
//     const half = Math.floor(boardSize / 2) * playerSize;
//     return {
//         size: {
//             board: boardSize,
//             player: playerSize,
//             maxDim: boardSize * playerSize
//         },
//         positions: {
//             player: {
//                 top: half,
//                 left: half
//             },
//             enemies: []
//         },
//         playerScore: 0,
//         highScore,
//         timeElapsed: 0,
//         enemySpeed: 5,
//         enemyIndex: 0,
//         activeEnemies: 1,
//         baseScore: 10
//     }
// };

export default class Game extends Component {
  constructor() {
    super()
    this.state = getDefaultState();
  }
  componentDidMount() {
    this.startGame()
    console.log(WINDOWWIDTH - PLAYERWIDTH)
  }

  startGame = () => {
    this.playerInterval = setInterval(() => {
      this.updatePlayerPosition()
    }, INTERVAL)

    // this.enemyInterval = setInterval(this.updateEnemyPositions, 50);
    // this.timeInterval = setInterval(this.updateGame, 1000);
    // this.gameInterval = setInterval(this.updateEnemiesInPlay, 250);
  }

  // need to 

  updatePlayerPosition = () => {
    const { playerPosition, playerSpeed, playerPosition: { top, left } } = this.state
    let { playerTurningDirection, playerDirection } = this.state
    let thresholdExceeded = false;
    // if player is turning,
    if (playerTurningDirection !== null) {
      // if threshold not reached, keep moving in playerDirection
      switch (playerDirection) {
        case UP:
          // if threshold not reached, keep moving in playerDirection (do nothing)
          if (top <= playerTurningDirection.turnThreshold) {
            // if threshold exceeded,
            // reassign playerDirection so player will move in turningDirection + playerspeed
            playerDirection = playerTurningDirection.direction
            // make sure player is turning in the row or column coords
            playerPosition.top = playerTurningDirection.turnThreshold;
            playerTurningDirection = null

          }
          break;
        case RIGHT:
          if (left >= playerTurningDirection.turnThreshold) {
            playerDirection = playerTurningDirection.direction
            playerPosition.left = playerTurningDirection.turnThreshold;
            playerTurningDirection = null

          }
          break;
        case DOWN:

          if (top >= playerTurningDirection.turnThreshold) {
            playerDirection = playerTurningDirection.direction
            playerPosition.top = playerTurningDirection.turnThreshold;
            playerTurningDirection = null

          }
          break;
        case LEFT:

          if (left <= playerTurningDirection.turnThreshold) {
            playerDirection = playerTurningDirection.direction
            playerPosition.left = playerTurningDirection.turnThreshold;
            playerTurningDirection = null

          }
          break;
      }

    }
    switch (playerDirection) {
      case UP:
        // wait until next column.  Worm can only go in the columns/rows
        playerPosition.top -= playerSpeed
        break;
      case RIGHT:
        playerPosition.left += playerSpeed
        break;
      case DOWN:
        playerPosition.top += playerSpeed
        break;
      case LEFT:
        playerPosition.left -= playerSpeed
        break;
    }

    // check walls
    switch (playerDirection) {
      case UP:
        if (top <= 0) playerPosition.top = 0;
        break;
      case DOWN:
        if (top >= WINDOWHEIGHT - TOTAL_CELL_HEIGHT) playerPosition.top = WINDOWHEIGHT - TOTAL_CELL_HEIGHT;
        break;
      case LEFT:
        if (left <= 0) playerPosition.left = 0;
        break;
      case RIGHT:
        if (left >= WINDOWWIDTH - TOTAL_CELL_WIDTH) playerPosition.left = WINDOWWIDTH - TOTAL_CELL_WIDTH;
        break;
    }
    this.setState({
      playerPosition: playerPosition,
      playerTurningDirection: playerTurningDirection,
      playerDirection: playerDirection,
    })
  }

  // player pressing direction keys in worm.js
  handlePlayerMovement = (direction) => {

    // can't go backwards.  Don't register if opposite: if going 'UP', you can't go 'DOWN'
    let threshold = null
    let playerTurningDirection = this.state.playerTurningDirection;
    if (this.state.playerDirection !== OPPOSITE_DIRECTIONS[direction]) {
      if (direction !== this.state.playerDirection) {
        // set playerTurningDirection if it is a different direction (ie player didn't hit left twice)
        threshold = this.getTurnThreshold();
        playerTurningDirection = {
          direction: direction,
          turnThreshold: threshold,
        };
        // don't update direction
      }
      this.setState({
        playerTurningDirection: playerTurningDirection,
      }, () => {
        console.log(this.state);

      });
    }
  }

  getTurnThreshold = () => {
    const { playerDirection, playerPosition } = this.state;
    let threshold
    switch (playerDirection) {
      // player is moving up, and turning left or right.  
      // Set threshold to the greatest y value that is lower than player.top.
      case UP:
        // looping from small to large values of y
        console.log(Y_VALUES)
        threshold = Y_VALUES.reduce((previous, val) => val <= playerPosition.top ? val : previous, Y_VALUES[0])
        break;
      case DOWN:
        // threshold = lowest y that is HIGHER than position.top
        // looping from large to small
        threshold = [...Y_VALUES].reverse().reduce((previous, val) => val >= playerPosition.top ? val : previous, Y_VALUES[0])
        break;
      case LEFT:
        // highest x that is lower than position.left
        threshold = X_VALUES.reduce((previous, val) => val <= playerPosition.left ? val : previous, X_VALUES[0])
        break;
      case RIGHT:
        threshold = [...X_VALUES].reverse().reduce((previous, val) => val >= playerPosition.left ? val : previous, X_VALUES[0])
        break;
      default:
        break;
    }
    console.log('threshold');

    console.log(threshold);

    return threshold
  }

  //Functions to write

  //placeFood
  //generateNewFood
  //handlePlayerMovement
  //handlePlayerCollision
  //updateGame
  //updateTimeAndScore
  //incrementPlayerSpeed
  //incrementPlayerLength
  //resetGame



  render() {
    const {
      playerPosition
    } = this.state

    return (
      <div>
        <Board />
        <Worm playerPosition={playerPosition}
          handlePlayerMovement={this.handlePlayerMovement} />
      </div>
    )
  }
  componentWillUnmount() {
    clearInterval(this.state.playerInterval)
  }
}