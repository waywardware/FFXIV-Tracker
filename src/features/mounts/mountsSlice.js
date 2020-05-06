import { createSlice } from '@reduxjs/toolkit';
const https = require('https');

export const EMPTY = 0;
export const DONE = 1;
export const SEARCHING = 2;
export const mountsSlice = createSlice({
    name: 'mounts',
    initialState: {
        playerId: 0,
        allMounts: {},
    },
    reducers: {
        selectPlayer: (state, action) => {
            state.playerId = action.payload.playerId
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

export const { selectPlayer, infoLookupComplete } = mountsSlice.actions

export const selectPlayerId = state => state.mounts.playerId
export const selectAllMounts = state => state.mounts.allMounts

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