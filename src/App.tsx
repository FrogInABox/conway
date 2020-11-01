import React, { useState } from 'react';
import Grid from './components/Grid';

const emptyGrid: boolean[][] = Array(10).fill(Array(10).fill(0));

const App = () => {
  const [tick, setTick] = useState(0);
  const [grid, setGrid] = useState(emptyGrid);

  return (
    <main>
      <h1>Conway's Game of Life</h1>
      <Grid grid={grid} />
      <br />
      <div>
        <button>Start</button>
        <span>Tick: {tick}</span>
      </div>
    </main>
  );
};

export default App;
