import React, { useState, useCallback, useEffect } from 'react';
import Grid from './components/Grid';
import { TICK_INTERVAL } from './config';
import { emptyGrid, toggleCell, updateGrid } from './utils';

const App = () => {
  const [tick, setTick] = useState(0);
  const [grid, setGrid] = useState(emptyGrid);
  const [started, setStarted] = useState(false);

  const onToggleCell = useCallback((y, x) => {
    setGrid((g) => toggleCell(g, y, x));
  }, []);

  useEffect(() => {
    if (started) {
      const interval = setInterval(() => {
        setGrid((g) => updateGrid(g));
        setTick((t) => t + 1);
      }, TICK_INTERVAL);
      return () => clearInterval(interval);
    }
  }, [started]);

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
