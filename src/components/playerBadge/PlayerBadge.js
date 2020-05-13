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
    },
    name: {
        paddingLeft: "8pt"
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
                <Grid container direction="row">
                    <Grid item xs={2}>
                        <Avatar alt={props.name} src={props.icon} />
                    </Grid>
                    <Grid className={styles.name} item container xs={10} alignItems="flex-start" alignContent="flex-start">
                        <Grid item xs={12}>
                            <Typography width="100%" align="left" noWrap={true} variant="button">{props.name}</Typography>
                        </Grid>
                        <Grid item xs={12} alignItems="flex-start">
                            <Typography align="left" noWrap={true} variant="caption">{props.server}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </ButtonBase>
    )
}
