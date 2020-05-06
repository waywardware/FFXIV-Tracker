import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PlayerBadge from '../../components/playerBadge/PlayerBadge'
import { selectResults, selectSearch, selectPage } from './searchSlice';
import { startInfoLookup } from '../mounts/mountsSlice'
import { selectMembers, addToGroup } from '../group/groupSlice'
import styles from './Search.module.css'
import { search, getPlayerMountInfo } from '../../app/xivapi';

export function Search() {
    const dispatch = useDispatch();
    const group = useSelector(selectMembers)
    const searchString = useSelector(selectSearch)
    const page = useSelector(selectPage)
    const results = useSelector(selectResults)

    var timeout

    useEffect(() => {
        dispatch(startInfoLookup())
    })

    let onChange = event => {
        let value = event.target.value
        console.log("Change", value)

        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            search(value)
        }, 500)
    }

    let showMounts = id => {
        getPlayerMountInfo(id)
    }

    function pagination(page) {
        if (page.current < page.total) {
            //return <button onClick={() => dispatch(nextPage())}>Next Page</button>
        }
    }

    function searchResults(results, searchString, currentPage) {
        if (!results[searchString] || !results[searchString][currentPage]) return;
        return (
            <ul className={styles.resultsList}>
                {results[searchString][currentPage].map((playerId, index) =>
                    <li key={index}>
                        <div className={styles.resultItem}>
                            <PlayerBadge
                                playerId={playerId}
                                clickHandler={showMounts} />
                            <div className={styles.groupAdd}>
                                <button onClick={() => dispatch(addToGroup({ id: playerId }))}> Add To Group</button>
                            </div>
                        </div>
                    </li>
                )}
            </ul>
        )
    }

    return (
        <div>
            {group.map(v => <PlayerBadge playerId={v} clickHandler={showMounts} isSmall='true' />)}
            <input className={styles.search} type="text" placeholder="Search..." onChange={onChange} />
            {searchResults(results, searchString, page.current)}
        </div>
    )
}