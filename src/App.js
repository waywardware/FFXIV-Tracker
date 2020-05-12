import React from 'react';
import { Search } from './features/search/Search'
import { Mounts } from './features/mounts/Mounts'
import { Grid } from '@material-ui/core'
import './App.css';

function App() {
  return (
    <Grid className="grid" direction="row" container spacing={2} alignItems="flex-start" justify="flex-start">
      <Grid item xs={12} sm={5} md={3} lg={2} xl={2}>
        <Search />
      </Grid>
      <Grid item xs={12} sm={7} md={9} lg={10} xl={10}>
        <Mounts />
      </Grid>
    </Grid>
  );
}

export default App;
