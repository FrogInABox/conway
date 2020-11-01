import { emptyGrid, toggleCell, cellNeedsToggle } from './utils';
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
