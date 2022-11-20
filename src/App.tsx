import React from 'react';

import Slide from './components/Slide/Slide';
import { slides } from './mocks/slides';

function App() {
  return (
    <div className="App">
      <Slide id="slideone" items={slides} />
    </div>
  );
}

export default App;
