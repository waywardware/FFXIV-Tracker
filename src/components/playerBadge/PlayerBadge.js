import React from 'react'
import styles from './PlayerBadge.module.css'

export default function PlayerBadge(props) {
    let player = props.player

    let info = props.isSmall ? <div/> : <div className={styles.info}><span>{player.name}</span> <span>@ {player.server}</span></div>

    return <div className={styles.playerBadge}>
        <img className={styles.avatar} src={player.icon} onClick={() => props.clickHandler(props.player.playerId)} />
        {info}
    </div>
}