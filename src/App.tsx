import React, { useState, useCallback } from 'react';
import Grid from './components/Grid';
import { toggleCell } from './utils';

const emptyGrid: boolean[][] = Array(10).fill(Array(10).fill(false));

const App = () => {
  const [tick, setTick] = useState(0);
  const [grid, setGrid] = useState(emptyGrid);

  const onToggleCell = useCallback((y, x) => {
    setGrid((g) => toggleCell(g, y, x));
  }, []);

  return (
    <main>
      <h1>Conway's Game of Life</h1>
      <Grid grid={grid} onToggleCell={onToggleCell} />
      <br />
      <div>
        <button>Start</button>
        <span>Tick: {tick}</span>
      </div>
    </main>
  );
};

export default App;
