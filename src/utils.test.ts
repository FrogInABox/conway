import { toggleCell } from './utils';

const emptyGrid: boolean[][] = Array(10).fill(Array(10).fill(false));

describe('toggleCell', () => {
  it('correctly toggles cells on and off', () => {
    const toggled7x5 = toggleCell(emptyGrid, 7, 5);

    expect(toggled7x5[7][5]).toBeTruthy();

    const emptyAgain = toggleCell(toggled7x5, 7, 5);

    expect(emptyAgain[7][5]).toBeFalsy();
    expect(emptyAgain).toEqual(emptyGrid);
  });
});
