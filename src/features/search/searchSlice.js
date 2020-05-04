import { createSlice } from '@reduxjs/toolkit';
const https = require('https');

export const EMPTY = 0;
export const DONE = 1;
export const SEARCHING = 2;
export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        value: '',
        status: EMPTY,
        page: {
            current: 0,
            total: 0,
            perPage: 0,
        },
        results: []
    },
    reducers: {
        startingSearch: (state, action) => {
            state.value = action.payload;
            state.status = SEARCHING;
        },
        searchComplete: (state, action) => {
            if (state.value !== action.payload.name) return;

            let data = action.payload.data;
            let p = data.Pagination;
            let r = data.Results;

            if (p && p.Results > 0) {
                state.date = action.payload.date
                state.value = action.payload.name
                state.page.current = p.Page
                state.page.total = p.PageTotal
                state.page.perPage = p.ResultsPerPage

                state.results = r.map(v => ({
                    avatar: v.Avatar,
                    playerId: v.ID,
                    name: v.Name,
                    server: v.Server
                }))

                state.status = DONE;
            } else {
                state.status = EMPTY
            }
        },
    }
})

export const { startingSearch, searchComplete} = searchSlice.actions

export const selectSearch = state => state.search.value
export const selectResults = state => state.search.results
export const selectStatus = state => state.search.status
export const selectPage = state => state.search.page

export const search = name => dispatch => {
    dispatch(startingSearch(name))
    https.get(`https://xivapi.com/character/search?name=${name}`, res => {
        let data = '';

        res.on('data', chunk => data += chunk)

        res.on('end', () => {
            dispatch(searchComplete({ name, data: JSON.parse(data) }))
        })
    }).on('error', console.log)
}

export const nextPage = () => (dispatch, getState) => {
    let state = getState()
    let name = state.search.value
    let page = state.search.page.current + 1

    dispatch(startingSearch(name))
    https.get(`https://xivapi.com/character/search?name=${name}&page=${page}`, res => {
        let data = '';

        res.on('data', chunk => data += chunk)

        res.on('end', () => {
            dispatch(searchComplete({ name, data: JSON.parse(data) }))
        })
    }).on('error', console.log)
}

export default searchSlice.reducer