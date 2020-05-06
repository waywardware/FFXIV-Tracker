import React from 'react';
import { Search } from './features/search/Search'
import { Mounts } from './features/mounts/Mounts'
import './App.css';

function App() {
  return (
    <div className="app">
      <div class="row">
        <div className="leftPane">
          <div class="card">
            <Search />
          </div>
        </div>
        <div className="mainPane">
          <div class="card">
            <Mounts />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
