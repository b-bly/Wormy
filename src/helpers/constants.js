
export const FPS = 5
export const INTERVAL = 1000 / FPS // how often game is updated in ms
export const WINDOWWIDTH = 640
export const WINDOWHEIGHT = 480 // pixels
export const CELLSIZE = 20  // number squares on board.  Should be called board size?
export const CELLWIDTH = parseInt(WINDOWWIDTH / CELLSIZE) // width in pixels of board cell
export const CELLHEIGHT = parseInt(WINDOWHEIGHT / CELLSIZE)
export const PLAYERWIDTH = CELLWIDTH
export const PLAYERHEIGHT = CELLHEIGHT
export const BORDERWIDTH = 2
export const TOTAL_CELL_HEIGHT = CELLHEIGHT + BORDERWIDTH * 2;
export const TOTAL_CELL_WIDTH = CELLWIDTH + BORDERWIDTH * 2;
export const X_VALUES = Array(CELLSIZE).fill('').map((el, i, arr) => {
  return i * CELLWIDTH;
});
export const Y_VALUES = Array(CELLSIZE).fill('').map((el, i, arr) => {
  return i * CELLHEIGHT;
});
console.log(X_VALUES)
console.log(Y_VALUES);


export const WHITE = 'rgb(255, 255, 255)'

export const BLACK = 'rgb(  0,   0,   0)'

export const RED = 'rgb(255,   0,   0)'

export const GREEN = 'rgb(  0, 255,   0)'

export const DARKGREEN = 'rgb(  0, 155,   0)'

export const DARKGRAY = 'rgb( 40,  40,  40)'

export const BGCOLOR = BLACK

export const UP = 'UP'

export const DOWN = 'DOWN'

export const LEFT = 'LEFT'

export const RIGHT = 'RIGHT'

export const HEAD = 0

export const Y_OFFSET = 100 // distance from top of window to top of board
export const X_OFFSET = 50