import { emptyGrid, toggleCell } from './utils';
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
