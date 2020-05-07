import React from 'react'
import styles from './PlayerBadge.module.css'
import { ListItem, Button, ListItemSecondaryAction, ListItemAvatar, Avatar, ListItemText, withWidth } from '@material-ui/core';

function PlayerBadge(props) {
    let player = props.player

    let add = (props.width === 'xs') ? 'Add' : 'Add To Group'
    let remove = (props.width === 'xs') ? 'Remove' : 'Remove From Group'

    return (
        <ListItem button className={styles.playerBadge} key={props.index} onClick={() => props.showMounts(player.playerId)}>
            <ListItemAvatar>
                <Avatar alt={player.name} src={player.icon} />
            </ListItemAvatar>
            <ListItemText
                primary={player.name}
                secondary={player.server}
            />
            <ListItemSecondaryAction>
                <Button onClick={() => (props.pin) ? props.pin(props.index) : console.log()}>
                    {(props.pin) ? add : remove}
                </Button>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default withWidth()(PlayerBadge)