import './App.css';
import React, { useEffect, useState } from 'react';
import Project from './Project';

function App() {
  const [data, setData] = useState(null);

  return (
    <div className="App">
        {/* <p>{!data ? "Loading..." : data}</p> */}
        <Project />
    </div>
  );
}

export default App;
