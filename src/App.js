import React from 'react';
import { Search } from './features/search/Search'
import { Mounts } from './features/mounts/Mounts'
import { Grid } from '@material-ui/core'
import './App.css';

function App() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={5} lg={4} xl={3}>
        <Search />
      </Grid>
      <Grid item xs={12} sm={12} md={7} lg={8} xl={9}>
        <Mounts />
      </Grid>
    </Grid>
  );
}

export default App;
