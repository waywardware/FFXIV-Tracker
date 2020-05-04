import React from 'react'
import { useSelector } from 'react-redux'
import { selectResults, selectStatus, SEARCHING, DONE, selectAllMounts } from './mountsSlice'

export function Mounts() {
    const allMounts = useSelector(selectAllMounts)
    const mountResults = useSelector(selectResults)
    const status = useSelector(selectStatus)

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

    return (
        <div>
            {getHeader(status, '')}
            <ul>
                {console.log(mountResults)}
                {mountResults.map((result, index) =>
                    <li key={index}>
                        <img src={allMounts[result.name].icon}/> {result.name}
                    </li>
                )}
            </ul>
        </div>
    )
}