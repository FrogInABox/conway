import produce from 'immer';
import { GRID_ROWS, GRID_COLS } from './config';

export const emptyGrid: boolean[][] = Array(GRID_ROWS).fill(
  Array(GRID_COLS).fill(false),
);

export const toggleCell = (grid: boolean[][], y: number, x: number) => {
  // just return without changing if somehow outside grid
  if (y >= GRID_ROWS || x >= GRID_COLS) {
    return grid;
  }
  // use immer to keep this immutable with minimal effort from me
  return produce(grid, (newGrid) => {
    newGrid[y][x] = !grid[y][x];
  });
};

// determine if a cell needs to be toggled
export const cellNeedsToggle = (alive: boolean, livingNeighbours: number) => {
  if (alive && (livingNeighbours < 2 || livingNeighbours > 3)) {
    return true;
  } else if (!alive && livingNeighbours === 3) {
    return true;
  }
  return false;
};

export const getLivingNeighbourCount = (
  grid: boolean[][],
  y: number,
  x: number,
) => {
  // get all the neighbours, whilst testing for edges
  const neighbours = [
    y > 0 ? grid[y - 1][x] : null, // N
    x > 0 ? grid[y][x - 1] : null, // W
    y < GRID_ROWS - 1 ? grid[y + 1][x] : null, // S
    x < GRID_COLS - 1 ? grid[y][x + 1] : null, // E
    y > 0 && x > 0 ? grid[y - 1][x - 1] : null, // NW
    y > 0 && x < GRID_COLS - 1 ? grid[y - 1][x + 1] : null, // NE
    x > 0 && y < GRID_ROWS - 1 ? grid[y + 1][x - 1] : null, // SW
    x < GRID_COLS - 1 && y < GRID_ROWS - 1 ? grid[y + 1][x + 1] : null, // SE
  ];
  // filter to living neighbours and return count
  return neighbours.filter((n) => n).length;
};

export const updateGrid = (grid: boolean[][]) => {
  // update the grid immutably with immer
  return produce(grid, (newGrid) => {
    // loop through all cells in the grid
    for (let y = 0; y < GRID_ROWS; y++) {
      for (let x = 0; x < GRID_COLS; x++) {
        // toggle and cells that need to be toggled
        if (cellNeedsToggle(grid[y][x], getLivingNeighbourCount(grid, y, x))) {
          newGrid[y][x] = !grid[y][x];
        }
      }
    }
  });
};
