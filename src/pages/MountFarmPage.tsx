import React from 'react';
import { useDispatch } from 'react-redux';
import { getPlayerMountInfo } from '../app/xivapi';
import { Mounts } from '../features/mounts/Mounts';
import SearchLayout from '../features/search/SearchLayout';

function MountFarmPage(props: any) {
  const dispatch = useDispatch();

  return (
    <SearchLayout
      onPlayerPinned={(playerId) => dispatch(getPlayerMountInfo({ playerId }))}
    >
      <Mounts />
    </SearchLayout>
  );
}

export default MountFarmPage;
