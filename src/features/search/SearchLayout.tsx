import { Grid } from '@material-ui/core';
import React from 'react';
import { Search } from '../../features/search/Search';

interface SearchLayoutInputProps {
  onPlayerPinned: (playerId: string) => void
  children: JSX.Element
}

function SearchLayout(props: SearchLayoutInputProps) {

  return <Grid className="grid" direction="row" container spacing={2} alignItems="flex-start" justify="flex-start">
    <Grid item xs={12} sm={5} md={3} lg={2} xl={2}>
      <Search 
        onPlayerPinned={props.onPlayerPinned}
      />
    </Grid>
    <Grid item xs={12} sm={7} md={9} lg={10} xl={10}>
      {props.children}
    </Grid>
  </Grid>
}

export default SearchLayout