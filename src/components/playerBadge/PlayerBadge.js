import React from 'react'
import { useSelector } from "react-redux"
import styles from './PlayerBadge.module.css'
import { selectPlayers } from '../../features/player/playerSlice'

export default function PlayerBadge(props) {
    const players = useSelector(selectPlayers)
    let player = players[props.playerId]

    let info = props.isSmall ? <div/> : <div className={styles.info}><span>{player.name}</span> <span>@ {player.server}</span></div>

    return <div className={styles.playerBadge}>
        <img className={styles.avatar} src={player.icon} onClick={() => props.clickHandler(props.playerId)} />
        {info}
    </div>
}