import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PlayerBadge from '../../components/playerBadge/PlayerBadge'
import { selectResults, selectSearch, selectPage, addToPinned, selectPinned } from './searchSlice';
import { startInfoLookup, selectPlayer } from '../mounts/mountsSlice'
import styles from './Search.module.css'
import { searchForPlayer, getPlayerMountInfo } from '../../app/xivapi';

export function Search() {
    const dispatch = useDispatch();
    const pinned = useSelector(selectPinned)
    const page = useSelector(selectPage)
    const results = useSelector(selectResults)
    const searchString = useSelector(selectSearch)

    var timeout

    useEffect(() => {
        dispatch(startInfoLookup())
    })

    let onChange = event => {
        let value = event.target.value
        console.log("Change", value)

        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            dispatch(searchForPlayer(value))
        }, 500)
    }

    let showMounts = playerId => {
        dispatch(getPlayerMountInfo({ playerId }))
        dispatch(selectPlayer({ playerId }))
    }

    function pagination(page) {
        if (page.current < page.total) {
            //return <button onClick={() => dispatch(nextPage())}>Next Page</button>
        }
    }

    function searchResults(results) {
        return (
            <ul className={styles.resultsList}>
                {results.map((player, index) =>
                    <li key={index}>
                        <div className={styles.resultItem}>
                            <PlayerBadge
                                player={player}
                                clickHandler={showMounts} />
                            <div className={styles.groupAdd}>
                                <button onClick={() => dispatch(addToPinned({ index }))}> Add To Group</button>
                            </div>
                        </div>
                    </li>
                )}
            </ul>
        )
    }

    return (
        <div>
            {pinned.map(v => <PlayerBadge player={v} clickHandler={showMounts} isSmall='true' />)}
            <input className={styles.search} type="text" placeholder="Search..." onChange={onChange} />
            {searchResults(results, searchString, page.current)}
        </div>
    )
}