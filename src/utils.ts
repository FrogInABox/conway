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
