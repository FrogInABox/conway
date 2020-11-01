import produce from 'immer';
import {
  emptyGrid,
  toggleCell,
  cellNeedsToggle,
  getLivingNeighbourCount,
  updateGrid,
} from './utils';
import { GRID_ROWS, GRID_COLS } from './config';

describe('toggleCell', () => {
  it('correctly toggles cells on and off', () => {
    const toggled7x5 = toggleCell(emptyGrid, 7, 5);

    expect(toggled7x5[7][5]).toBeTruthy();

    const emptyAgain = toggleCell(toggled7x5, 7, 5);

    expect(emptyAgain[7][5]).toBeFalsy();
    expect(emptyAgain).toEqual(emptyGrid);
  });

  it('does not allow toggling cells outside the grid', () => {
    const outsideRows = toggleCell(emptyGrid, GRID_ROWS, 1);

    expect(outsideRows).toEqual(emptyGrid);

    const outsideCols = toggleCell(emptyGrid, 1, GRID_COLS);

    expect(outsideCols).toEqual(emptyGrid);
  });
});

describe('cellNeedsToggle', () => {
  it('toggles if dead and exactly 3 neighbours', () => {
    expect(cellNeedsToggle(false, 3)).toBeTruthy();
  });
  it('toggles if alive and less than 2 neighbours', () => {
    expect(cellNeedsToggle(true, 1)).toBeTruthy();
    expect(cellNeedsToggle(true, 0)).toBeTruthy();
  });
  it('toggles if alive and more than 3 neighbours', () => {
    expect(cellNeedsToggle(true, 4)).toBeTruthy();
    expect(cellNeedsToggle(true, 5)).toBeTruthy();
    expect(cellNeedsToggle(true, 6)).toBeTruthy();
    expect(cellNeedsToggle(true, 7)).toBeTruthy();
    expect(cellNeedsToggle(true, 8)).toBeTruthy();
  });
  it('does not toggle if alive and 2 or 3 neighbours', () => {
    expect(cellNeedsToggle(true, 2)).toBeFalsy();
    expect(cellNeedsToggle(true, 3)).toBeFalsy();
  });
  it('does not toggle if dead and less than 3 neighbours', () => {
    expect(cellNeedsToggle(false, 2)).toBeFalsy();
    expect(cellNeedsToggle(false, 1)).toBeFalsy();
    expect(cellNeedsToggle(false, 0)).toBeFalsy();
  });
  it('does not toggle if dead and more than 3 neighbours', () => {
    expect(cellNeedsToggle(false, 4)).toBeFalsy();
    expect(cellNeedsToggle(false, 5)).toBeFalsy();
    expect(cellNeedsToggle(false, 6)).toBeFalsy();
    expect(cellNeedsToggle(false, 7)).toBeFalsy();
    expect(cellNeedsToggle(false, 8)).toBeFalsy();
  });
});

describe('getLivingNeighbourCount', () => {
  it('returns 0 if no living neighbours', () => {
    expect(getLivingNeighbourCount(emptyGrid, 21, 21)).toEqual(0);
  });
  it('counts NSEW neighbours', () => {
    const nsew = produce(emptyGrid, (grid) => {
      grid[19][20] = true; // N
      grid[20][19] = true; // W
      grid[21][20] = true; // S
      grid[20][21] = true; // E
    });
    expect(getLivingNeighbourCount(nsew, 20, 20)).toEqual(4);
  });
  it('counts diagonal neighbours', () => {
    const diagonal = produce(emptyGrid, (grid) => {
      grid[19][19] = true; // NW
      grid[19][21] = true; // NE
      grid[21][21] = true; // SE
      grid[21][19] = true; // SW
    });
    expect(getLivingNeighbourCount(diagonal, 20, 20)).toEqual(4);
  });
  it('does not count cells outside of the grid', () => {
    // grid with all edges alive to make sure living count does not wrap around
    const edges = produce(emptyGrid, (grid) => {
      // fill the west and east edges
      for (let i = 0; i < GRID_ROWS; i++) {
        grid[i][0] = true;
        grid[i][GRID_COLS - 1] = true; // 0-based index, so -1 from count
      }
      // fill the north and south edges
      for (let i = 0; i < GRID_COLS; i++) {
        grid[0][i] = true;
        grid[GRID_ROWS - 1][i] = true; // 0-based index, so -1 from count
      }
    });
    expect(getLivingNeighbourCount(edges, 0, 20)).toEqual(2); // N
    expect(getLivingNeighbourCount(edges, 20, 0)).toEqual(2); // W
    expect(getLivingNeighbourCount(edges, GRID_ROWS - 1, 20)).toEqual(2); // S
    expect(getLivingNeighbourCount(edges, 20, GRID_COLS - 1)).toEqual(2); // E
    expect(getLivingNeighbourCount(edges, 0, 0)).toEqual(2); // NW
    expect(getLivingNeighbourCount(edges, 0, GRID_COLS - 1)).toEqual(2); // NE
    expect(getLivingNeighbourCount(edges, GRID_ROWS - 1, 0)).toEqual(2); // SE
    expect(
      getLivingNeighbourCount(edges, GRID_ROWS - 1, GRID_COLS - 1),
    ).toEqual(2); // SW
  });
});

describe('updateGrid', () => {
  it('does nothing if no living cells', () => {
    expect(updateGrid(emptyGrid)).toEqual(emptyGrid);
  });
  it('correctly updates a simple pattern', () => {
    const before = produce(emptyGrid, (grid) => {
      grid[5][5] = true;
      grid[6][5] = true;
      grid[7][5] = true;
    });
    const after = produce(emptyGrid, (grid) => {
      grid[6][5] = true;
      grid[6][4] = true;
      grid[6][6] = true;
    });
    expect(updateGrid(before)).toEqual(after);
  });
});
