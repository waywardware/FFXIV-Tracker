import { createSlice } from '@reduxjs/toolkit';
import { transformSearchFromXIVApi } from '../../app/xivapi';

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
    reducers: {
        playerSearchRequest: (state, action) => {
            state.status = SEARCHING
            state.value = action.meta.name;
        },
        playerSearchSuccess: (state, action) => {
            if (state.value !== action.meta.name) return;
            let payload = transformSearchFromXIVApi(action.payload)
            state.page = payload.page
            state.results = payload.results
            state.status = DONE
        }
    }
})

export const selectSearch = state => state.search.value
export const selectResults = state => state.search.results
export const selectPage = state => state.search.page
export const selectIsLoading = state => state.search.status === SEARCHING

export const { playerSearchRequest, playerSearchSuccess } = searchSlice.actions

export default searchSlice.reducer