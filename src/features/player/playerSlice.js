import { createSlice } from '@reduxjs/toolkit'

export const playerSlice = createSlice({
    name: 'player',
    initialState: {
    },
    reducers: {
        playerSearchSuccess: (state, action) => {
            let results = action.payload.Results
            results.foreach(v => {
                if (!state[v.ID]) state[v.ID] = {}
                Object.assign(state[v.ID],
                    {
                        character: {
                            icon: v.Avatar,
                            name: v.Name,
                            server: v.Server
                        }
                    })
            })
        },
        playerInfoSuccess: (state, action) => {
            if (!state[action.meta]) state[action.meta] = {}
            Object.assign(state[action.meta],
                transformMIMOFromXIVApi(action.payload))
        },
    }
})

const transformMIMOFromXIVApi = ({ Character, Minions, Mounts }) => ({
    character: {
        icon: Character.Avatar,
        name: Character.Name,
        server: Character.Server
    },
    mounts: Mounts.map(v => v.Name),
    minions: Minions.map(v => v.Name)
})

export const { playerInfoSuccess } = playerSlice.actions

export const selectPlayers = state => state.player

export default playerSlice.reducer