import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        value: '',
        page: {
            current: 0,
            total: 0,
        },
        results: {

        }
    },
    reducers: {
        startingSearch: (state, action) => {
            state.value = action.payload;
        },
        updatePage: (state, action) => {
            state.page = action.payload
        },
        searchComplete: (state, action) => {
            let { name, page, totalPages, results } = action.payload
            if (!state.results[name]) state.results[name] = []
            state.results[name][0] = totalPages
            state.results[name][page] = results
            if (name === state.value) {
                state.page.current = page
                state.page.total = totalPages
            }
        },
    }
})

export const { startingSearch, updatePage, searchComplete } = searchSlice.actions

export const selectSearch = state => state.search.value
export const selectResults = state => state.search.results
export const selectPage = state => state.search.page

export default searchSlice.reducer