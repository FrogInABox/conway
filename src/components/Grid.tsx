import React from 'react';
import Cell from './Cell';

type Props = {
  grid: boolean[][];
  onToggleCell: (y: number, x: number) => void;
};
const Grid = ({ grid, onToggleCell }: Props) => {
  return (
    <div>
      {grid.map((row, y) => (
        <div key={y}>
          {row.map((cell, x) => (
            <Cell key={x} alive={cell} onToggle={() => onToggleCell(y, x)} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
