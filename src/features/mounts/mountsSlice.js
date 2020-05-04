import { createSlice } from '@reduxjs/toolkit';
const https = require('https');

export const EMPTY = 0;
export const DONE = 1;
export const SEARCHING = 2;
export const mountsSlice = createSlice({
    name: 'mounts',
    initialState: {
        playerId: 0,
        date: 0,
        status: EMPTY,
        allMounts: {},
        results: []
    },
    reducers: {
        startingLookup: (state, action) => {
            if (state.date > action.payload.date) return;

            state.date = action.date
            state.playerId = action.payload.playerId
            state.status = SEARCHING
            console.log(`starting for ${state.playerId}`)
        },
        lookupComplete: (state, action) => {
            if (state.playerId !== action.payload.playerId) return

            let payload = action.payload
            let data = payload.data
            let r = data.Mounts

            if (r && r.length > 0) {
                state.date = payload.date
                state.playerId = payload.playerId

                state.results = r.map(value => ({
                    icon: value.Icon,
                    name: value.Name
                }))
                state.status = DONE
            } else {
                state.status = EMPTY
            }
        },
        invalidateMounts: (state, action) => {
            state.playerId = 0
            state.date = 0
            state.status = EMPTY
            state.results = []
        },
        infoLookupComplete: (state, action) => {
            action.payload.results.forEach(v => {
                state.allMounts[v.name] = {
                    icon: v.icon
                }
            })
        }
    }
})

export const { startingLookup, lookupComplete, invalidateMounts, infoLookupComplete } = mountsSlice.actions

export const selectResults = state => state.mounts.results
export const selectStatus = state => state.mounts.status
export const selectAllMounts = state => state.mounts.allMounts

export const lookup = playerId => (dispatch, getState) => {
    let state = getState();

    if (state.mounts.playerId === playerId) return;

    let date = Date.now()

    dispatch(startingLookup({ playerId, date }))
    https.get(`https://xivapi.com/character/${playerId}?data=MIMO&extended=2`, res => {
        let data = '';

        res.on('data', chunk => data += chunk)

        res.on('end', () => {
            dispatch(lookupComplete({ playerId, date, data: JSON.parse(data) }))
        })
    }).on('error', console.log)
}

export const startInfoLookup = () => (dispatch, getState) => {
    let state = getState();
    if (Object.keys(state.mounts.allMounts).length > 0) return;

    https.get('https://ffxivcollect.com/api/mounts', res => {
        let data = '';

        res.on('data', chunk => data += chunk)

        res.on('end', () => {
            dispatch(infoLookupComplete(JSON.parse(data)))
        })
    }).on('error', console.log)
}

export default mountsSlice.reducer