import { Chip, Grid, makeStyles, Paper } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CollectionList from '../../components/collectionList/CollectionList'
import { ProgressBar } from '../../components/progressBar/ProgressBar'
import { playerRemove, POSSIBLE_FILTERS, selectAppliedFilters, selectAreMountsLoading, selectMounts, selectShowMounts, toggleFilter, toggleObtained } from './mountsSlice'

const useStyles = makeStyles({
    filters: {
        padding: '8pt',
        marginBottom: '6pt',
    },
    chip: {
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
            <CollectionList key={player.playerId}
                playerName={player.name}
                playerIcon={player.icon}
                collectionList={player.mounts}
                closeClicked={() => dispatch(playerRemove({ playerId: player.playerId }))}
                itemClicked={(itemId) => dispatch(toggleObtained({ playerId: player.playerId, mountId: itemId }))}
            />
        ) : <div />
        }
    </div >
}