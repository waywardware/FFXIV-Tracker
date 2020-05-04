import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PlayerBadge from '../../components/playerBadge/PlayerBadge'
import { search, increasePage, selectResults, selectSearch, selectStatus, DONE, SEARCHING, selectPage, nextPage } from './searchSlice';
import { lookup, invalidateMounts, startInfoLookup } from '../mounts/mountsSlice'
import { addToGroup, selectMembers } from '../group/groupSlice'
import styles from './Search.module.css'

export function Search() {
    const dispatch = useDispatch();
    const group = useSelector(selectMembers)
    const searchString = useSelector(selectSearch)
    const results = useSelector(selectResults)
    const status = useSelector(selectStatus)
    const page = useSelector(selectPage)

    var timeout

    useEffect(() => {
        dispatch(startInfoLookup())
    })

    let onChange = event => {
        let value = event.target.value
        console.log("Change", value)

        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            dispatch(search(value))
            dispatch(invalidateMounts())
        }, 500)
    }

    let onSelectPlayer = id => {
        dispatch(invalidateMounts())
        dispatch(lookup(id))
    }

    function getHeader(status, searchString) {
        switch (status) {
            case SEARCHING:
                return <h2>{`Searching for ${searchString}...`}</h2>
            case DONE:
                return <h2>{`Found for ${searchString}:`}</h2>
            default:
                return;
        }
    }

    function pagination(page) {
        if (page.current < page.total) {
            return <button onClick={() => dispatch(nextPage())}>Next Page</button>
        }
    }

    return (
        <div>
            {group.map(v => <PlayerBadge data={v} clickHandler={onSelectPlayer} isSmall='true' />)}
            <input className={styles.search} type="text" placeholder="Search..." onChange={onChange} />
            {pagination(page)}
            {getHeader(status, searchString)}
            <ul className={styles.resultsList}>
                {results.map((result, index) =>
                    <li>
                        <div className={styles.resultItem}>
                            <PlayerBadge
                                data={result}
                                clickHandler={onSelectPlayer} />
                            <div className={styles.groupAdd}>
                                <button onClick={() => dispatch(addToGroup(result))}> Add To Group</button>
                            </div>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    )
}