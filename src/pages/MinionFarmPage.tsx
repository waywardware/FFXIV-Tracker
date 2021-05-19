import React from 'react';
import { useDispatch } from 'react-redux';
import { getPlayerMountInfo } from '../app/xivapi';
import { Minions } from '../features/minions/Minions';
import SearchLayout from '../features/search/SearchLayout';

function MinionFarmPage(props: any) {

    const dispatch = useDispatch();

    return <SearchLayout

        onPlayerPinned={(playerId) => dispatch(getPlayerMountInfo({ playerId }))}>
        <Minions />
    </SearchLayout>
}

export default MinionFarmPage