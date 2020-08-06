import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectMounts, selectAppliedFilters, POSSIBLE_FILTERS, selectShowMounts, selectAreMountsLoading, playerRemove } from './mountsSlice'
import { toggleObtained, toggleFilter } from "./mountsSlice"
import { GridListTile, GridList, Avatar, Paper, Typography, Grid, Chip, makeStyles, Tooltip, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { ProgressBar } from '../../components/progressBar/ProgressBar'

const useStyles = makeStyles({
    mountResult: {
        position: 'relative',
        overflow: 'auto',
        padding: '8pt',
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
        padding: "2pt",
        display: 'box',
        align: 'center'
    },
    mountCount: {
        float: 'right',
        color: 'gray',
        marginTop: '2pt',
        marginRight: '8pt'
    },
    mountList: {
        marginTop: '4pt',
        marginBottom: '4pt'
    },
    unPin: {
        position: "absolute",
        top: "0pt",
        left: "0pt",
    }
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
                <IconButton className={classes.unPin} aria-label="remove" onClick={() => dispatch(playerRemove({ playerId: player.playerId }))}>
                    <CloseIcon />
                </IconButton>
                <Grid container direction="row" justify="flex-start" alignItems="center" alignContent="center">
                    <Grid container item lg={1} md={2} direction="column" alignItems="center">
                        <Grid item xs={12}>
                            <Avatar src={player.icon}>
                                {player.name}
                            </Avatar>
                        </Grid>
                        <Grid item xs={12} >
                            <Typography component='div' variant="caption" align="center" className={classes.typography}>{player.name}</Typography>
                        </Grid>
                    </Grid>
                    <Grid className={classes.mountList} item lg={11} md={10}>
                        <GridList cellHeight="auto" cols={0} spacing={6}>
                            {player.mounts.map(({ icon, name, obtained, id: mountId, sources }) => (
                                <Tooltip
                                    key={mountId}
                                    title={
                                        <React.Fragment>
                                            <Grid container direction="column" alignItems="center" alignContent="center">
                                                <Grid item>
                                                    <Typography variant="body1" align="center">{name}</Typography>
                                                </Grid>
                                                {sources.map(({ text }, index) =>
                                                    <Grid item key={index}>
                                                        <Typography variant="caption" align="center" >{text}</Typography>
                                                    </Grid>
                                                )}
                                            </Grid>
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
                        <Typography
                            variant="caption"
                            className={classes.mountCount}>
                            {player.mounts.filter(mount => mount.obtained).length}/{player.mounts.length}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper >
        ) : <div />
        }
    </div >
}