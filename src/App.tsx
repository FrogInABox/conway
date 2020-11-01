import React, { useState, useCallback } from 'react';
import Grid from './components/Grid';
import { emptyGrid, toggleCell } from './utils';

const App = () => {
  const [tick, setTick] = useState(0);
  const [grid, setGrid] = useState(emptyGrid);
  const [started, setStarted] = useState(false);

  const onToggleCell = useCallback((y, x) => {
    setGrid((g) => toggleCell(g, y, x));
  }, []);

  return (
    <main>
      <h1>Conway's Game of Life</h1>
      <Grid grid={grid} onToggleCell={!started ? onToggleCell : undefined} />
      <br />
      <div>
        <button onClick={() => setStarted(!started)}>
          {started ? 'Stop' : 'Start'}
        </button>
        <span>Tick: {tick}</span>
      </div>
    </main>
  );
};

export default App;
