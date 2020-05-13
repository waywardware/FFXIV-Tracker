import React from 'react'
import { Avatar, Paper, ButtonBase, Typography, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        width: '100%',
        display: 'flex',
    },
    playerBadge: {

        width: '100%',
        backgroundColor: 'aliceblue',
        marginBottom: '6pt',
        padding: '8pt',
    }
})

export default function PlayerBadge(props) {
    const styles = useStyles()

    return (

        <ButtonBase
            focusRipple
            className={styles.root}
        >
            <Paper className={styles.playerBadge} onClick={() => props.onClick()}>
                <Grid container spacing={1} direction="row">
                    <Grid item xs={1}>
                        <Avatar alt={props.name} src={props.icon} />
                    </Grid>
                    <Grid item container xs={11}>
                        <Grid item xs={12}>
                            <Typography variant="button">{props.name}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="caption">{props.server}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </ButtonBase>
    )
}
