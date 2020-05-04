import React from 'react'
import styles from './PlayerBadge.module.css'

export default function PlayerBadge(props) {
    let data = props.data

    let info = props.isSmall ? <div/> : <div className={styles.info}><span>{data.name}</span> <span>@ {data.server}</span></div>

    return <div className={styles.playerBadge}>
        <img className={styles.avatar} src={data.avatar} onClick={() => props.clickHandler(data.playerId)} />
        {info}
    </div>
}