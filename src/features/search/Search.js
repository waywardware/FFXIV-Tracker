import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PlayerBadge from '../../components/playerBadge/PlayerBadge'
import { toggledPin } from '../player/playerSlice'
import { selectResults, selectSearch, selectPage } from './searchSlice';
import { searchForPlayer, getPlayerMountInfo } from '../../app/xivapi';
import { fetchAllMounts } from '../../app/ffxivcollect'
import { Paper, TextField } from '@material-ui/core';
import styles from './Search.module.css'

export function Search() {
    const dispatch = useDispatch();
    const page = useSelector(selectPage)
    const results = useSelector(selectResults)
    const searchString = useSelector(selectSearch)

    var timeout

    useEffect(() => {
        dispatch(fetchAllMounts())
    }, [dispatch])

    let onChange = event => {
        let value = event.target.value

        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            dispatch(searchForPlayer(value))
        }, 500)
    }

    let showMounts = playerId => {
        dispatch(getPlayerMountInfo({ playerId }))
    }

    let togglePlayerPin = playerId => {
        dispatch(toggledPin({ playerId }))
        dispatch(getPlayerMountInfo({ playerId, forPinned: true }))
    }

    function searchResults(results) {
        return (
            <div className={styles.resultsList}>
                {results
                    .map((player, index) => (
                        <PlayerBadge
                            key={player.playerId}
                            name={player.name}
                            server={player.server}
                            icon={player.icon}
                            isPinned={player.isPinned}
                            showMounts={() => showMounts(player.playerId)}
                            togglePin={() => togglePlayerPin(player.playerId)}
                        />
                    ))}

            </div>
        )
    }

    return (
        <div>
            <Paper elevation={3} className={styles.searchField}>
                <TextField size="small" className={styles.searchField} label="Search..." onChange={onChange} variant="outlined" />
            </Paper>
            {searchResults(results, searchString, page.current)}
        </div>

    )
}