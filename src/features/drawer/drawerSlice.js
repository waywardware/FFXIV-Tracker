import { createSlice } from '@reduxjs/toolkit'

export const drawerSlice = createSlice({
    name: 'drawer',
    initialState: {
        open: false
    },
    reducers: {
        toggleDrawer: (state) => {
            state.open = !state.open
        }
    }
})

export const selectIsDrawerOpen = state => state.drawer.open

export const { toggleDrawer } = drawerSlice.actions

export default drawerSlice.reducer