import { createSlice } from '@reduxjs/toolkit'

export const playerSlice = createSlice({
    name: 'player',
    initialState: {
        0: {
            icon: '',
            name: '',
            server: '',
        }
    },
    reducers: {
        infoFromSearch: (state, action) => {
            action.payload.forEach(({ id, icon, name, server }) => {
                if (!state[id]) state[id] = {}
                Object.assign(state[id], {
                    icon,
                    name,
                    server,
                });
            })
        },
        mountData: (state, action) => {
            let { playerId, mounts } = action.payload
            if (!state[playerId]) state[playerId] = {}
            Object.assign(state[playerId], {
                mounts
            })
        }
    }
})

export const { infoFromSearch, mountData } = playerSlice.actions

export const selectPlayers = state => state.player

export default playerSlice.reducer