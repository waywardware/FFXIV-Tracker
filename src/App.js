import { makeStyles } from '@material-ui/core';
import { CollapsibleDrawer } from './features/drawer/CollapsibleDrawer'
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MountFarmPage from './pages/MountFarmPage';

const useStyles = makeStyles((theme) => (
  {
    root: {
      display: 'flex'
    },
    app: {
      width: '100%',
      margin: '8pt'
    }
  }
))

function App() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <CollapsibleDrawer />
        <div className={classes.app}>
          <Route exact path="/" component={MountFarmPage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
