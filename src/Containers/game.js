import React, { Component, Fragment } from 'react';
import * as constants from '../helpers/constants'
import Board from '../Game/board'
import Worm from '../Game/worm'

const getDefaultState = () => {
  const middle = (Math.floor(constants.CELLSIZE/2)) - 1
  const middleX = middle * constants.CELLWIDTH + constants.X_OFFSET + constants.BORDERWIDTH/2
  const middleY = middle * constants.CELLHEIGHT + constants.Y_OFFSET + constants.BORDERWIDTH/2

  return {
    playerPosition: {
      top: middleY,
      left: middleX,
    },
    playerSpeed: 0,
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
    console.log(this.state)
    console.log(constants)
    
  }

  startGame = () => {
    this.playerInterval = setInterval(() => {
      this.updatePlayerPosition()
    }, constants.INTERVAL)

    // this.enemyInterval = setInterval(this.updateEnemyPositions, 50);
    // this.timeInterval = setInterval(this.updateGame, 1000);
    // this.gameInterval = setInterval(this.updateEnemiesInPlay, 250);
  }

  updatePlayerPosition = () => {
    const { playerPosition, playerSpeed } = this.state
    playerPosition.left += playerSpeed
    this.setState({
      playerPosition: playerPosition,
    })
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
        <Worm playerPosition={playerPosition} />
      </div>
    )
  }
  componentWillUnmount() {
    clearInterval(this.state.playerInterval)
  }
}