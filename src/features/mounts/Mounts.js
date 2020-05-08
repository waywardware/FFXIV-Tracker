import React from 'react'
import { useSelector } from 'react-redux'
import { selectPinned } from './mountsSlice'
import { GridListTile, GridList, Avatar, Paper, Typography, Grid } from '@material-ui/core'
import styles from './Mounts.module.css'

export function Mounts() {
    const pinned = useSelector(selectPinned)

    return (
        <div>
            {console.log(pinned) || Object.values(pinned).map(player =>
                <Paper className={styles.mountResult} elevation={3} key={player.playerId}>
                    <Grid className={styles.padded} container direction="row" justify="flex-start" alignItems="center">
                        <Grid item>
                            <Avatar src={player.icon}>
                                {player.name}
                            </Avatar>
                        </Grid>
                        <Grid item style={({marginLeft: "8pt"})}>
                            <Typography variant="h6">{player.name}</Typography>
                        </Grid>
                    </Grid>
                    <GridList cellHeight="auto" cols={0} spacing={6}>
                        {player.mounts.map(({ icon, name, obtained }) => (
                            <GridListTile className={obtained ? styles.obtained : styles.notObtained} key={name}>
                                <Avatar variant="rounded" src={icon} alt={`${name} icon`} />
                                {name}
                            </GridListTile>
                        ))}
                    </GridList>
                </Paper>
            )}
        </div>
    )
}