import { makeStyles } from '@material-ui/core';
import { CollapsibleDrawer } from './features/drawer/CollapsibleDrawer'
import React from 'react';
import { Route, Switch } from 'react-router';
import MountFarmPage from './pages/MountFarmPage';
import MinionFarmPage from './pages/MinionFarmPage';

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
    <div className={classes.root}>
      <CollapsibleDrawer />
      <div className={classes.app}>
        <Switch>
          <Route path="/mounts" component={MountFarmPage} />
          <Route path="/minions" component={MinionFarmPage}/>
          <Route component={MountFarmPage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
