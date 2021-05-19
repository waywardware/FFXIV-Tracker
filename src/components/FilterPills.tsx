import { Chip, Grid, makeStyles, Paper } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
    filters: {
        padding: '8pt',
        marginBottom: '6pt',
    },
    chip: {
    },
})

interface FilterPillsProps {
    possibleFilters: Array<string>
    appliedFilters: Array<string>
    filterClicked: (filter: string) => void
}

function FilterPills({possibleFilters, appliedFilters, filterClicked}: FilterPillsProps) {
    const classes = useStyles()

    return <Paper className={classes.filters} elevation={3} >
        <Grid item container xs={12} className={classes.chip} spacing={1} justify="space-around">
            {possibleFilters.map((filter) => (
                <Grid item key={filter}>
                    <Chip
                        color={appliedFilters.includes(filter) ? "primary" : "default"}
                        onClick={() => filterClicked(filter)}
                        label={filter}
                    />
                </Grid>
            ))}
        </Grid>
    </Paper>
}

export default FilterPills