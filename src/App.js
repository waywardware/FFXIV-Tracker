import React from 'react';
import { Search } from './features/search/Search'
import { Mounts } from './features/mounts/Mounts'
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="leftPane">
        <Search />
      </div>
      <div className="mainPane">
        <Mounts />
      </div>
    </div>
  );
}

export default App;
