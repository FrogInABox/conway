import React from 'react';

type Props = {
  alive: boolean;
};
const Cell = ({ alive }: Props) => {
  return <span>{alive}</span>;
};

export default Cell;
