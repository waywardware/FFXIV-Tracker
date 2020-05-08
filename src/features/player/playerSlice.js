import { createSlice } from '@reduxjs/toolkit'
import { playerSearchRequest, playerSearchSuccess, playerInfoSuccess, playerInfoRequest, transformMIMOFromXIVApi } from '../../app/xivapi'

export const LOADING = 0;
export const STABLE = 1;

export const playerSlice = createSlice({
    name: 'player',
    initialState: {
        status: STABLE,
        players: {}
    },
    reducers: {
        toggledPin: (state, action) => {
            let { playerId } = action.payload
            if (!state.players[playerId]) state.players[playerId] = {}
            state.players[playerId].isPinned = !state.players[playerId].isPinned;
        },
    },
    extraReducers: {
        [playerSearchRequest]: (state) => Object.assign({}, state, { status: LOADING }),
        [playerSearchSuccess]: (state, action) => {
            let results = action.payload.Results;
            results.forEach(result => {
                result = transformSearchFromXIVApi(result)
                let { character } = result

                if (!state.players[character.playerId]) state.players[character.playerId] = {}
                Object.assign(state.players[character.playerId], result)
            })
            state.status = STABLE
        },
        [playerInfoRequest]: state => Object.assign({}, state, { status: LOADING }),
        [playerInfoSuccess]: (state, action) => {
            let { playerId } = action.meta
            if (!state.players[playerId]) state.players[playerId] = {}
            Object.assign(state.players[playerId],
                transformMIMOFromXIVApi(action.payload))
            state.status = STABLE
        },
        'FAILURE': (state, action) => console.log(action)
    }
})

const transformSearchFromXIVApi = ({ Avatar: icon, ID: playerId, Name: name, Server: server }) => ({ character: { playerId, icon, name, server } })

export const { toggledPin } = playerSlice.actions

export const selectPlayers = state => state.player.players
export const selectStatus = state => state.player.status

export default playerSlice.reducer