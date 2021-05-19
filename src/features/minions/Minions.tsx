import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CollectionList from '../../components/CollectionList'
import FilterPills from '../../components/FilterPills'
import { ProgressBar } from '../../components/ProgressBar'
import { playerRemove, POSSIBLE_FILTERS, selectAppliedFilters, selectAreMinionsLoading, selectMinions, selectShowMinions, toggleFilter, toggleObtained } from './minionsSlice'


export function Minions() {
    const dispatch = useDispatch();
    const isMountsReadyForDisplay = useSelector(selectShowMinions)
    const isLoading = useSelector(selectAreMinionsLoading)
    const minions = useSelector(selectMinions)
    const appliedFilters = useSelector(selectAppliedFilters)



    return <div>
        <FilterPills
            possibleFilters={POSSIBLE_FILTERS}
            appliedFilters={appliedFilters}
            filterClicked={(filter) => dispatch(toggleFilter({ filter }))}
        />
        <ProgressBar isLoading={isLoading} />
        {isMountsReadyForDisplay ? minions.map(({character, collection}) =>
            <CollectionList key={character.playerId}
                playerName={character.name}
                playerIcon={character.icon}
                items={collection}
                closeClicked={() => dispatch(playerRemove({ playerId: character.playerId }))}
                itemClicked={(itemId) => dispatch(toggleObtained({ playerId: character.playerId, mountId: itemId }))}
            />
        ) : <div />
        }
    </div >
}