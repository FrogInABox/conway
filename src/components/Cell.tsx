import React from 'react';

type Props = {
  alive: boolean;
  onToggle: () => void;
};
const Cell = ({ alive, onToggle }: Props) => {
  return <span onClick={onToggle}>{alive ? 'O' : 'X'}</span>;
};

export default Cell;
