import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import MountFarmPage from './pages/MountFarmPage';

function App() {

  return (
    <Router>
      <div>
        <div className="content">
          <Route exact path="/" component={MountFarmPage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
