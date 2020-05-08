import { createSlice } from '@reduxjs/toolkit';
import { playerSearchRequest, playerSearchSuccess } from '../../app/xivapi';

export const SEARCHING = 0
export const DONE = 1

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        value: '',
        status: DONE,
        page: {
            current: 0,
            total: 0,
        },
        results: []
    },
    extraReducers: {
        [playerSearchRequest]: (state, action) => {
            state.value = action.meta.name;
        },
        [playerSearchSuccess]: (state, action) => {
            if (state.value !== action.meta.name) return;
            let payload = transformForSearch(action.payload)
            state.page = payload.page
            state.results = payload.results
        }
    }
})

const transformForSearch = (payload) =>
    ({
        page: {
            current: payload.Pagination.Page,
            total: payload.Pagination.PageTotal,
        },
        results: payload.Results.map(r => ({
            icon: r.Avatar,
            playerId: r.ID,
            name: r.Name,
            server: r.Server,
        }))
    })

export const selectSearch = state => state.search.value
export const selectResults = state => {
    let results = state.search.results.filter(result => !state.player.players[result.playerId].isPinned)

    let pinned = Object.values(state.player.players)
        .filter(player => player.isPinned)
        .map(player => Object.assign({}, player.character, { isPinned: player.isPinned }))

    return pinned.concat(results)
}
export const selectPage = state => state.search.page

export default searchSlice.reducer