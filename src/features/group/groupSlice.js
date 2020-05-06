import { createSlice } from '@reduxjs/toolkit'

export const groupSlice = createSlice({
    name: 'group',
    initialState: {
        members: [],
    },
    reducers: {
        addToGroup: (state, action) => {
            let { id } = action.payload
            state.members.push(id)
        },
        restoreGroup: (state, action) => {
            state.members = action.payload
        }
    }
})

export const { addToGroup, restoreGroup } = groupSlice.actions

export const selectMembers = state => state.group.members

export default groupSlice.reducer