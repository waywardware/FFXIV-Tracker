import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectPinned, selectAppliedFilters, toggleObtained, toggleFilter, POSSIBLE_FILTERS } from './mountsSlice'
import { GridListTile, GridList, Avatar, Paper, Typography, Grid, Chip } from '@material-ui/core'
import styles from './Mounts.module.css'

export function Mounts() {
    const dispatch = useDispatch();
    const pinned = useSelector(selectPinned)
    const appliedFilters = useSelector(selectAppliedFilters)

    return (
        <div>
            {Object.values(pinned).map(player =>
                <Paper className={styles.mountResult} elevation={3} key={player.playerId}>
                    <Grid className={styles.padded} container direction="row" justify="flex-start" alignItems="center">
                        <Grid item lg={1} xs={2}>
                            <Avatar src={player.icon}>
                                {player.name}
                            </Avatar>
                        </Grid>
                        <Grid item lg={2} xs={6}>
                            <Typography variant="h6">{player.name}</Typography>
                        </Grid>
                        <Grid item container lg={9} xs={12} className={styles.chip} spacing={1} justify="space-around">
                            {POSSIBLE_FILTERS.map((filter) => (
                                <Grid item>
                                    <Chip
                                        color={appliedFilters.includes(filter)? "primary" : "default"}
                                        onClick={() => dispatch(toggleFilter({ filter }))}
                                        label={filter}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <GridList cellHeight="auto" cols={0} spacing={6}>
                        {player.mounts.map(({ icon, name, obtained, id: mountId }) => (
                            <GridListTile
                                onClick={() => dispatch(toggleObtained({ playerId: player.playerId, mountId }))}
                                className={obtained ? styles.obtained : styles.notObtained}
                                key={name}>
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