import React, { useEffect } from 'react';
import { Search } from '../features/search/Search'
import { Mounts } from '../features/mounts/Mounts'
import { Grid } from '@material-ui/core'
import './MountFarmPage.css';
import { useDispatch } from 'react-redux';
import { getPlayerMountInfo } from '../app/xivapi';

function MountFarmPage(props) {

  const dispatch = useDispatch()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const pids = params.get("pid")

    if (!pids) return

    pids
      .split(',')
      .forEach(playerId => {
        dispatch(getPlayerMountInfo({ playerId: parseInt(playerId) }))
      });
  }, [dispatch])


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

export default MountFarmPage;
