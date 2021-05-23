import React from 'react'
import { makeStyles, LinearProgress } from '@material-ui/core'

const useStyles = makeStyles({
    progressLoading: {
        visibility: "visible"
    },
    progressLoaded: {
        visibility: "hidden"
    },
    progress: {
        marginBottom: "6pt",
        marginRight: "10%",
        marginLeft: "10%"
    }
})

export function ProgressBar(props) {

    const classes = useStyles()

    return <LinearProgress className={`${props.isLoading ? classes.progressLoading : classes.progressLoaded} ${classes.progress}`} />
}