import React from 'react';
import './App.css';
import { Route, HashRouter } from 'react-router-dom';
import MountFarmPage from './pages/MountFarmPage';

function App() {
  return (
    <HashRouter>
      <div>
        <div className="content">
          <Route path="/" component={MountFarmPage} />
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
