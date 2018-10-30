import React, { Component, Fragment } from 'react';
import { CELLWIDTH, X_OFFSET, Y_OFFSET, BORDERWIDTH, CELLHEIGHT, INTERVAL, WINDOWWIDTH, WINDOWHEIGHT, PLAYERWIDTH, PLAYERHEIGHT, CELLSIZE, UP, DOWN, LEFT, RIGHT } from '../helpers/constants'
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
    playerDirection: LEFT,
    playerSpeed: 8,
    score: 0,
  }
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
    const { playerPosition, playerSpeed, playerDirection, playerPosition: { top, left } } = this.state

    // console.log(playerPosition.left);


    switch (playerDirection) {
      case UP:
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
        if (top >= WINDOWHEIGHT - PLAYERHEIGHT) playerPosition.top = WINDOWHEIGHT - PLAYERHEIGHT;
        break;
      case LEFT:
        if (left <= 0) playerPosition.left = 0;
        break;
      case RIGHT:
        if (left >= WINDOWWIDTH - PLAYERWIDTH) playerPosition.left = WINDOWWIDTH - PLAYERWIDTH;
        break;
    }
    this.setPlayerPosition(playerPosition)
  }

  setPlayerPosition = (playerPosition) => {
    this.setState({
      playerPosition: playerPosition
    })
  }

  handlePlayerMovement = (direction) => {
    this.setState({
      playerDirection: direction
    });
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