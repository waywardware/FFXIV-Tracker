import { InputBase, makeStyles, Paper } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMinions, fetchAllMounts } from '../../app/ffxivcollect';
import { searchForPlayer } from '../../app/xivapi';
import PlayerBadge from '../../components/PlayerBadge';
import { ProgressBar } from '../../components/ProgressBar';
import { selectIsLoading, selectPage, selectResults, selectSearch } from './searchSlice';

const useStyles = makeStyles((theme) => ({
    resultsList: {
        height: '100%',
        width: '100%',
    },

    searchField: {
        width: '100%',
        padding: '2pt',
        marginBottom: '6pt',
        display: 'flex'
    },

    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    }
}))

var value = ''

export function Search({ onPlayerPinned }) {

    const dispatch = useDispatch();
    const page = useSelector(selectPage)
    const results = useSelector(selectResults)
    const searchString = useSelector(selectSearch)
    const isLoading = useSelector(selectIsLoading)

    const styles = useStyles()

    useEffect(() => {
        dispatch(fetchAllMounts())
        dispatch(fetchAllMinions())
    }, [dispatch])

    let search = value => dispatch(searchForPlayer(value))

    let enterPressed = e => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            search(value)
        }
    }

    let pinPlayer = playerId => {
        onPlayerPinned(playerId)
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
                            onClick={() => pinPlayer(player.playerId)}
                        />
                    ))}

            </div>
        )
    }

    return (
        <div>
            <Paper elevation={3} className={styles.searchField}>
                <InputBase className={styles.input}
                    placeholder="Search Character..."
                    onChange={event => value = event.target.value}
                    onKeyUp={enterPressed} />
                <IconButton aria-label="search" onClick={() => search(value)}>
                    <SearchIcon />
                </IconButton>
            </Paper>
            <ProgressBar isLoading={isLoading} />
            {searchResults(results, searchString, page.current)}
        </div>

    )
}