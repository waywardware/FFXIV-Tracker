import React from 'react'
import { useSelector } from 'react-redux'
import { selectPlayerId, selectAllMounts } from './mountsSlice'
import { selectPlayers } from '../player/playerSlice'
import styles from './Mounts.module.css'

export function Mounts() {
    const allMounts = useSelector(selectAllMounts)
    const playerId = useSelector(selectPlayerId)
    const players = useSelector(selectPlayers)

    function getImage(mount) {
        var element
        if (allMounts[mount]) {
            element = <img src={allMounts[mount].icon} alt={`${mount} icon`}/>
        } else {
            //Nasty hack in case names don't quite match
            Object.keys(allMounts).forEach(key => {
                if(key.includes(mount) || mount.includes(key)) {
                    element = <img src={allMounts[key].icon} alt={`${mount} icon`}/>
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

    return (
        <div>
            <table>
                {getMounts().map((mount, index) =>
                <div className={styles.table}>
                    <tr>
                        <td className={styles.tableImg} key={index}>
                            {getImage(mount)}
                        </td>
                        <td key={index}>
                            {mount}
                        </td>
                    </tr>
                </div>
                )}
            </table>
        </div>
    )
}