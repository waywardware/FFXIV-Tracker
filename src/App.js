import React from 'react';
import { Search } from './features/search/Search'
import {Mounts} from './features/mounts/Mounts'
import './App.css';

function App() {
  return (
    <div className="App">
        <Search/>
        <Mounts/>
    </div>
  );
}

export default App;
