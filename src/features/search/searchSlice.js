import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        value: '',
        page: {
            current: 0,
            total: 0,
        },
        pinned: [],
        results: []
    },
    reducers: {
        playerSearchRequest: (state, action) => {
            state.value = action.meta;
        },
        updatePage: (state, action) => {
            state.page = action.payload
        },
        playerSearchSuccess: (state, action) => {
            if (state.value !== action.meta) return;
            let payload = transformForSearch(action.payload)
            state.page = payload.page
            state.results = payload.results
        },
        addToPinned: (state, action) => {
            let { index } = action.payload
            let playerToPin = state.results[index]

            if (state.pinned.includes(playerToPin)) return
            state.pinned.push(playerToPin)
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

export const { playerSearchRequest, updatePage, playerSearchSuccess, addToPinned } = searchSlice.actions

export const selectSearch = state => state.search.value
export const selectResults = state => state.search.results
export const selectPage = state => state.search.page
export const selectPinned = state => state.search.pinned

export default searchSlice.reducer