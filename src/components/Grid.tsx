import React, { memo } from 'react';

type CellProps = {
  alive: boolean;
  onToggle: () => void;
};
const Cell = memo(({ alive, onToggle }: Props) => {
  return <span onClick={onToggle}>{alive ? 'O' : 'X'}</span>;
});

type RowProps = {
  row: boolean[];
  y: number;
  onToggleCell: (y: number, x: number) => void;
};
const Row = memo(({ onToggleCell, row, y }: RowProps) => (
  <div>
    {row.map((cell, x) => (
      <Cell key={x} alive={cell} onToggle={() => onToggleCell?.(y, x)} />
    ))}
  </div>
));

type GridProps = {
  grid: boolean[][];
  onToggleCell?: (y: number, x: number) => void;
};
const Grid = ({ grid, onToggleCell }: GridProps) => (
  <div>
    {grid.map((row, y) => (
      <Row key={y} row={row} y={y} onToggleCell={onToggleCell} />
    ))}
  </div>
);

export default memo(Grid);
