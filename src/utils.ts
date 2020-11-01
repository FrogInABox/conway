import produce from 'immer';

export const toggleCell = (grid: boolean[][], y: number, x: number) => {
  // use immer to keep this immutable with minimal effort from me
  return produce(grid, (newGrid) => {
    newGrid[y][x] = !grid[y][x];
  });
};
