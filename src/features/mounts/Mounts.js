import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectMounts, selectAppliedFilters, POSSIBLE_FILTERS, selectShowMounts, selectAreMountsLoading } from './mountsSlice'
import { toggleObtained, toggleFilter } from "./mountsSlice"
import { GridListTile, GridList, Avatar, Paper, Typography, Grid, Chip, makeStyles, Tooltip } from '@material-ui/core'
import { ProgressBar } from '../../components/progressBar/ProgressBar'

const useStyles = makeStyles({
    padded: {
        padding: '8pt',
    },
    mountResult: {
        padding: '2pt',
        marginBottom: '6pt',
    },
    filters: {
        padding: '8pt',
        marginBottom: '6pt',
    },
    chip: {
    },
    notObtained: {
        filter: 'grayscale(100%)',
    },
    typography: {
        display: 'box',
        align: 'center'
    },
})

export function Mounts() {
    const dispatch = useDispatch();
    const isMountsReadyForDisplay = useSelector(selectShowMounts)
    const isLoading = useSelector(selectAreMountsLoading)
    const mounts = useSelector(selectMounts)
    const appliedFilters = useSelector(selectAppliedFilters)

    const classes = useStyles()

    return <div>
        <Paper className={classes.filters} elevation={3} >
            <Grid item container xs={12} className={classes.chip} spacing={1} justify="space-around">
                {POSSIBLE_FILTERS.map((filter) => (
                    <Grid item key={filter}>
                        <Chip
                            color={appliedFilters.includes(filter) ? "primary" : "default"}
                            onClick={() => dispatch(toggleFilter({ filter }))}
                            label={filter}
                        />
                    </Grid>
                ))}
            </Grid>
        </Paper>
        <ProgressBar isLoading={isLoading} />
        {isMountsReadyForDisplay ? mounts.map(player =>
            <Paper className={classes.mountResult} elevation={3} key={player.playerId}>
                <Grid className={classes.padded} container direction="row" justify="flex-start" alignItems="center" alignContent="center">
                    <Grid container item lg={1} direction="column" alignItems="center">
                        <Grid item xs={12}>
                            <Avatar src={player.icon}>
                                {player.name}
                            </Avatar>
                        </Grid>
                        <Grid item xs={12} >
                            <Typography component='div' variant="caption" className={classes.typography}>{player.name}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item lg={11}>
                        <GridList cellHeight="auto" cols={0} spacing={6}>
                            {player.mounts.map(({ icon, name, obtained, id: mountId, sources }) => (
                                <Tooltip
                                    title={
                                        <React.Fragment>
                                            <Typography>{name}</Typography>
                                            {sources.map(({ text }) =>
                                                <Typography>{text}</Typography>)}
                                        </React.Fragment>
                                    }
                                >
                                    <GridListTile
                                        onClick={() => dispatch(toggleObtained({ playerId: player.playerId, mountId }))}
                                        className={obtained ? classes.obtained : classes.notObtained}
                                        key={name}>
                                        <Avatar variant="rounded" src={icon} alt={`${name} icon`} />
                                        {name}
                                    </GridListTile>
                                </Tooltip>
                            ))}
                        </GridList>
                    </Grid>
                </Grid>
            </Paper>
        ) : <div />}
    </div>
}