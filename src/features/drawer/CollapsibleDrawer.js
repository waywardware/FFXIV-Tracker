import { Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Typography} from '@material-ui/core';
import { GitHub as GitHubIcon, Menu as MenuIcon, Home, Pets } from '@material-ui/icons';
import clsx from 'clsx';
import React from 'react';
import { NavLink } from '../../components/NavLink'
import { useDispatch, useSelector } from 'react-redux';
import { selectIsDrawerOpen, toggleDrawer } from './drawerSlice';

const useStyles = makeStyles((theme) => (
    {
        drawer: {
            display: "inline-block",
            width: 'auto',
            flexShrink: 0,
            whiteSpace: 'nowrap',
            position: "sticky !important",
            top: 0,
            height: "100vh",
            overflowY: "hidden"
        },
        drawerOpen: {
            float: 'left',
            width: 'auto',
        },
        drawerClose: {
            overflowX: 'hidden',
        },
        smallIcon: {
            minWidth: "0px !important"
        },
        hidden: {
            visibility: 'hidden',
            width: 0,
        }
    }
))

export function CollapsibleDrawer() {
    const dispatch = useDispatch()
    const open = useSelector(selectIsDrawerOpen)

    const handleToggleDrawer = () => dispatch(toggleDrawer())

    const classes = useStyles()

    return <Drawer
        variant="permanent"
        elevation={3}
        className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
        })}
        classes={{
            paper: clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })
        }}
    >
        <List>
            <ListItem button
                onClick={handleToggleDrawer}>
                <ListItemIcon className={open ? '' : classes.smallIcon}>
                    <MenuIcon />
                </ListItemIcon>
                <ListItemText className={open ? '' : classes.hidden}>
                    <Typography>FFXIV Tracker</Typography>
                </ListItemText>
            </ListItem>
            <NavLink
                href="/mounts"
                isOpen={open}
                icon={<Home />}
                linkName="Mounts"
            />
            <NavLink
                href="/minions"
                isOpen={open}
                icon={<Pets />}
                linkName="Minion"
            />
            <ListItem button component="a" href="https://github.com/waywardware/FFXIV-Tracker">
                <ListItemIcon className={open ? '' : classes.smallIcon}>
                    <GitHubIcon />
                </ListItemIcon>
                <ListItemText className={open ? '' : classes.hidden}>
                    <Typography>Github Page</Typography>
                </ListItemText>
            </ListItem>
        </List>
    </Drawer>
}