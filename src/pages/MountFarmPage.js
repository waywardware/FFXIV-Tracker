import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPlayerMountInfo } from '../app/xivapi';
import { Mounts } from '../features/mounts/Mounts';
import SearchLayout from '../features/search/SearchLayout';
import './MountFarmPage.css';

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
    <SearchLayout>
      <Mounts />
    </SearchLayout>
  );
}

export default MountFarmPage;
