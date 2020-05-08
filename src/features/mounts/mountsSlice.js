import { createSlice } from '@reduxjs/toolkit';
import { fetchAllMountsRequest, fetchAllMountsSuccess } from '../../app/ffxivcollect'

export const UNLOADED = 1;
export const LOADING = 2;
export const LOADED = 3;
export const mountsSlice = createSlice({
    name: 'mounts',
    initialState: {
        allMountData: UNLOADED,
        status: UNLOADED,
        playerId: 0,
        onlyInclude: ["Trial"],
        allMounts: [],
    },
    reducers: {
    },
    extraReducers: {
        [fetchAllMountsRequest]: (state) => {
            state.allMountData = LOADING
        },
        [fetchAllMountsSuccess]: (state, action) => {
            state.allMounts = action.payload.results
                .sort((a, b) => a.id - b.id)
            state.allMountData = LOADED
        }
    },
})


const addMountData = (allMounts, playerMounts) => allMounts.map((mount) => {
    let obtained = playerMounts[mount.name] ||
        !!Object.keys(playerMounts).find(playersMountName => (playersMountName.includes(mount.name) || mount.name.includes(playersMountName)))

    return Object.assign({}, mount, { obtained })
})

const applyFilters = (mounts, onlyInclude) => mounts
    .filter(mount => onlyInclude
        .find(askedSourceType => mount.sources
            .find(mountsSource => askedSourceType === mountsSource.type)
        )
    )

export const selectPinned = state => {
    let pinnedPlayerList = Object.values(state.player.players)
        .filter(player => player.isPinned && player.mounts)
        .map(({character: {playerId, name, icon, server}, mounts}) => ({playerId, name, icon, server, mounts}))

    return pinnedPlayerList.map(player => {
        player.mounts = addMountData(state.mounts.allMounts, player.mounts);
        player.mounts = applyFilters(player.mounts, state.mounts.onlyInclude)
        return player
    })
}

export default mountsSlice.reducer