import React from 'react';
import Cell from './Cell';

type Props = {
  grid: boolean[][];
};
const Grid = ({ grid }: Props) => {
  return (
    <div>
      {grid.map((y) => (
        <div>
          {y.map((x) => (
            <Cell alive={x} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
