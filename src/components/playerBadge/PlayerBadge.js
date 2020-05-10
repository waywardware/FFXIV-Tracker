import React from 'react'
import styles from './PlayerBadge.module.css'
import { Avatar, Card, CardHeader, IconButton } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons'

export default function PlayerBadge(props) {

    return (
        <Card className={styles.playerBadge}>
            <CardHeader
                avatar={<Avatar alt={props.name} src={props.icon} />}
                title={props.name}
                subheader={props.server}
                action={
                    <IconButton onClick={() => props.togglePin()}>
                        {(props.isPinned) ? <Remove/> : <Add/>}
                    </IconButton>
                }
            />
        </Card>
    )
}
