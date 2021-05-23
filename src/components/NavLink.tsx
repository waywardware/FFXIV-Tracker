import { ListItem, ListItemIcon, ListItemText, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import React from 'react';

const useStyles = makeStyles((theme) => (
    {
        largeIcon: {
            minWidth: "40px !important"
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

interface NavLinkProps {
    isOpen: boolean,
    href: string,
    icon: JSX.Element
    linkName: string
}

export function NavLink({ isOpen, href, icon, linkName }: NavLinkProps) {
    const classes = useStyles()

    return <ListItem button component={Link} to={href}>
        <ListItemIcon className={isOpen ? classes.largeIcon : classes.smallIcon}>
            {icon}
        </ListItemIcon>
        <ListItemText className={isOpen ? classes.largeIcon : classes.hidden}>
            <Typography>{linkName}</Typography>
        </ListItemText>
    </ListItem>
}