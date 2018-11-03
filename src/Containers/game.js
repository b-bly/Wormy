import React, { Component, Fragment } from 'react';
import { CELLWIDTH, X_OFFSET, Y_OFFSET, BORDERWIDTH, CELLHEIGHT, INTERVAL, WINDOWWIDTH, WINDOWHEIGHT, PLAYERWIDTH, PLAYERHEIGHT, CELLSIZE, UP, DOWN, LEFT, RIGHT, Y_VALUES, X_VALUES, TOTAL_CELL_WIDTH, TOTAL_CELL_HEIGHT } from '../helpers/constants'
import Board from '../Game/board'
import Worm from '../Game/worm'


const getDefaultState = () => {
  const middle = (Math.floor(CELLSIZE / 2)) - 1
  const middleX = middle * CELLWIDTH + BORDERWIDTH / 2
  const middleY = middle * CELLHEIGHT + BORDERWIDTH / 2
  return {
    playerState: [
      { // first item is the head
        position: {
          top: 0,
          left: middleX,
          direction: LEFT,
        },
        turning: []
      },
      // 2nd body piece for testing
      { // second piece (body)
        position: {
          top: 0,
          left: middleX + TOTAL_CELL_WIDTH,
          direction: LEFT,
        },
        turning: []
      }
    ],
    // playerPosition: {
    //   top: 0,
    //   left: middleX,
    // },
    // playerTurningDirection: null, // {direction: String, turnThreshold: Number}
    // playerDirection: LEFT,
    playerSpeed: 8,
    score: 0,
  }
}

// *** More than one piece to body ***
// need a different state structure
// the head of the snake could be more than one turn ahead of a body piece
// So turns need to be stored in an array until all of body has turned
// How about:
const playerState = [
  { // first item is the head
    position: {
      top: 0,
      left: 0,
      direction: LEFT
    },
    turning: [  // should not be array for head?
      {
        direction: '',
        threshold: 0,
      },
    ]
  },
  { // second piece (body)
    position: {
      top: 0,
      left: 0,
      threshold: 0,
    },
    turning: [
      {
        direction: '',
        threshold: 0,
      },
      {  // push upcoming turns to array
        direction: '',
        threshold: 0,
      },
    ]
  }
]
// With this structure, I just have to adjust the code to loop through the array.
// And instead of setting turning to null, unshift one turn from the array

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
    // const { playerPosition, playerSpeed, playerPosition: { top, left } } = this.state
    // let { playerTurningDirection, playerDirection } = this.state
    // let thresholdExceeded = false;
    let { playerSpeed, playerState } = this.state;
    const playerStateExample = [
      { // first item is the head
        position: {
          top: 0,
          left: 0,
          direction: LEFT,
        },
        turning: []
      },
    ]
    // Deal with turning later
    // if player is turning,
    // if (playerTurningDirection !== null) {
    //   // if threshold not reached, keep moving in playerDirection
    //   switch (playerDirection) {
    //     case UP:
    //       // if threshold not reached, keep moving in playerDirection (do nothing)
    //       if (top <= playerTurningDirection.turnThreshold) {
    //         // if threshold exceeded,
    //         // reassign playerDirection so player will move in turningDirection + playerspeed
    //         playerDirection = playerTurningDirection.direction
    //         // make sure player is turning in the row or column coords
    //         playerPosition.top = playerTurningDirection.turnThreshold;
    //         playerTurningDirection = null

    //       }
    //       break;
    //     case RIGHT:
    //       if (left >= playerTurningDirection.turnThreshold) {
    //         playerDirection = playerTurningDirection.direction
    //         playerPosition.left = playerTurningDirection.turnThreshold;
    //         playerTurningDirection = null

    //       }
    //       break;
    //     case DOWN:

    //       if (top >= playerTurningDirection.turnThreshold) {
    //         playerDirection = playerTurningDirection.direction
    //         playerPosition.top = playerTurningDirection.turnThreshold;
    //         playerTurningDirection = null

    //       }
    //       break;
    //     case LEFT:

    //       if (left <= playerTurningDirection.turnThreshold) {
    //         playerDirection = playerTurningDirection.direction
    //         playerPosition.left = playerTurningDirection.turnThreshold;
    //         playerTurningDirection = null

    //       }
    //       break;
    //   }
    // }
    playerState = [...playerState].map((bodyPiece) => {
      const { direction: playerDirection, top, left } = bodyPiece.position
      const playerPosition = { ...bodyPiece.position }

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
      return {
        position: playerPosition,
        turning: [],
      }
    })
    this.setState({
      playerState: playerState
    })
  }

  // player pressing direction keys in worm.js
  handlePlayerMovement = (direction) => {
    // how to handle a player pressing keys repeatedly before the worm has turned: 
    // If there's a previous turn for the worm head: replace previous turn with the 
    // new one. ( for each body piece)
    // If no turn in queue, then add it to each body piece.
    let { playerState } = this.state

    playerState = playerState.map((piece) => {

      let threshold = null
      let { position: { direction: playerDirection }, turning: { direction: playerTurningDirection } } = piece;
      // can't go backwards.  Don't register if opposite: if going 'UP', you can't go 'DOWN'
      if (playerDirection !== OPPOSITE_DIRECTIONS[direction]) {
        // can't be the same direction
        if (direction !== playerDirection) {
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

    })
  }

  getTurnThreshold = () => {
    // const { playerDirection, playerPosition } = this.state;
    // ***placeholders for testing REPLACE!
    const playerDirection = 'LEFT'
    const playerPosition = { top: 0, left: 0 }

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

    return (
      <div>
        <Board />
        <Worm playerPosition={this.state.playerState[0].position}
          handlePlayerMovement={this.handlePlayerMovement} />
        <Worm playerPosition={this.state.playerState[1].position}
          handlePlayerMovement={this.handlePlayerMovement} />
      </div>
    )
  }
  componentWillUnmount() {
    clearInterval(this.state.playerInterval)
  }
}