import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CollectionList from '../../components/CollectionList'
import FilterPills from '../../components/FilterPills'
import { ProgressBar } from '../../components/ProgressBar'
import { PlayerUnpinned } from "../../util/CollectionUtils"
import { POSSIBLE_FILTERS, selectAppliedFilters, selectAreMountsLoading, selectMounts, selectShowMounts, toggleFilter, toggleObtained } from './mountsSlice'



export function Mounts() {
    const dispatch = useDispatch();
    const isMountsReadyForDisplay = useSelector(selectShowMounts)
    const isLoading = useSelector(selectAreMountsLoading)
    const mounts = useSelector(selectMounts)
    const appliedFilters = useSelector(selectAppliedFilters)



    return <div>
        <FilterPills
            possibleFilters={POSSIBLE_FILTERS}
            appliedFilters={appliedFilters}
            filterClicked={(filter) => dispatch(toggleFilter({ filter }))}
        />
        <ProgressBar isLoading={isLoading} />
        {isMountsReadyForDisplay ? mounts.map(({ character, collection }) =>
            <CollectionList key={character.playerId}
                playerName={character.name}
                playerIcon={character.icon}
                items={collection}
                closeClicked={() => dispatch(PlayerUnpinned({ playerId: character.playerId }))}
                itemClicked={(itemId) => dispatch(toggleObtained({ playerId: character.playerId, mountId: itemId }))}
            />
        ) : <div />
        }
    </div >
}