import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';


const useStyles = makeStyles({
    formControl: {
        margin: 1,
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: 3,
    },
});

interface FilterDropdownInput {
    possibleFilters: Array<string>
    appliedFilters: Array<string>
    onSelectionChanged: (selection: Array<string>) => void
}

function FilterDropdown({ possibleFilters, appliedFilters, onSelectionChanged }: FilterDropdownInput) {

    const classes = useStyles();

    return <FormControl className={classes.formControl}>
        <InputLabel>{ }</InputLabel>
        <Select
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            multiple
            value={appliedFilters}
            onChange={(event) => onSelectionChanged(event.target.value as Array<string>)}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected) => (
                <div className={classes.chips}>
                    {
                        appliedFilters.map((filter: string) => (<Chip
                            key={filter}
                            label={filter}
                            className={classes.chip} />
                        ))
                    }
                </div>
            )}
        >
            {possibleFilters.map((filter) => (
                <MenuItem key={filter} value={filter}>
                    {filter}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
}

export default FilterDropdown