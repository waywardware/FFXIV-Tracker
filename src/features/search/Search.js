import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PlayerBadge from '../../components/playerBadge/PlayerBadge'
import { selectResults, selectSearch, selectPage, addToPinned, selectPinned } from './searchSlice';
import { startInfoLookup, selectPlayer } from '../mounts/mountsSlice'
import styles from './Search.module.css'
import { searchForPlayer, getPlayerMountInfo } from '../../app/xivapi';
import { List, Paper, TextField } from '@material-ui/core';

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

    function searchResults(results) {
        return (
            <List className={styles.resultsList}>
                {pinned && pinned.length > 0 && pinned.map((player, index) => (
                    <PlayerBadge
                        player={player}
                        index={index}
                        showMounts={showMounts}
                    />
                ))}
                {results
                    .filter(player => pinned.length < 1 || !pinned.find(pinned => pinned.playerId === player.playerId))
                    .map((player, index) => (
                        <PlayerBadge
                            player={player}
                            index={index}
                            showMounts={showMounts}
                            pin={index => dispatch(addToPinned({ index }))}
                        />
                    ))}

            </List>
        )
    }

    return (
        <Paper elevation={3} className={styles.resultsList}>
            <TextField  size="small" className={styles.searchField} label="Search..." onChange={onChange} variant="outlined" />
            {searchResults(results, searchString, page.current)}
        </Paper>
    )
}