import React from 'react'
import { useSelector } from 'react-redux'
import { selectPlayerId, selectAllMounts } from './mountsSlice'
import { selectPlayers } from '../player/playerSlice'
import styles from './Mounts.module.css'
import { GridListTile, GridList, Paper } from '@material-ui/core'

export function Mounts() {
    const allMounts = useSelector(selectAllMounts)
    const playerId = useSelector(selectPlayerId)
    const players = useSelector(selectPlayers)

    function getImage(mount) {
        var element
        if (allMounts[mount]) {
            element = <img src={allMounts[mount].icon} alt={`${mount} icon`} />
        } else {
            //Nasty hack in case names don't quite match
            Object.keys(allMounts).forEach(key => {
                if (key.includes(mount) || mount.includes(key)) {
                    element = <img src={allMounts[key].icon} alt={`${mount} icon`} />
                    return;
                }
            });
        }
        return element;
    }

    function getMounts() {
        if (players[playerId]) {
            return players[playerId].mounts || []
        }
        return []
    }

    return getMounts() && getMounts().length > 0 && <Paper elevation={3} className={styles.padded}>
            <GridList cellHeight={80} cellWidth={80} cols="10" space={3}>
                {getMounts().map((mount, index) => (
                    <GridListTile key={index}>
                        {getImage(mount)}
                        {mount}
                    </GridListTile>
                ))}
            </GridList>
        </Paper>
}