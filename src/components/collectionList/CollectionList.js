import { Avatar, Grid, GridList, GridListTile, IconButton, makeStyles, Paper, Tooltip, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import React from 'react'


const useStyles = makeStyles({
    collectionResult: {
        position: 'relative',
        overflow: 'auto',
        padding: '8pt',
        marginBottom: '6pt',
    },
    collectionList: {
        marginTop: '4pt',
        marginBottom: '4pt'
    },
    notObtained: {
        filter: 'grayscale(100%)',
    },
    collectionCount: {
        float: 'right',
        color: 'gray',
        marginTop: '2pt',
        marginRight: '8pt'
    },
    typography: {
        padding: "2pt",
        display: 'box',
        align: 'center'
    },
    unPin: {
        position: "absolute",
        top: "0pt",
        left: "0pt",
    }
})

export default function CollectionList({ playerName, playerIcon, collectionList, itemClicked, closeClicked }) {

    const classes = useStyles()

    return (
        <Paper className={classes.collectionResult} elevation={3} >
            <IconButton className={classes.unPin} aria-label="remove" onClick={() => closeClicked()}>
                <CloseIcon />
            </IconButton>
            <Grid container direction="row" justify="flex-start" alignItems="center" alignContent="center">
                <Grid container item lg={1} md={2} direction="column" alignItems="center">
                    <Grid item xs={12}>
                        <Avatar src={playerIcon}>
                            {playerName}
                        </Avatar>
                    </Grid>
                    <Grid item xs={12} >
                        <Typography component='div' variant="caption" align="center" className={classes.typography}>{playerName}</Typography>
                    </Grid>
                </Grid>
                <Grid className={classes.collectionList} item lg={11} md={10}>
                    <GridList cellHeight="auto" cols={0} spacing={6}>
                        {collectionList.map(({ icon, name, obtained, id: itemId, sources }) => (
                            <Tooltip
                                key={itemId}
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
                                    onClick={() => itemClicked(itemId)}
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
                        className={classes.collectionCount}>
                        {collectionList.filter(collectable => collectable.obtained).length}/{collectionList.length}
                    </Typography>
                </Grid>
            </Grid>
        </Paper >
    )
}