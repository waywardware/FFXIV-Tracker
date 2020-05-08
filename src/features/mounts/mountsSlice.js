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
        appliedFilters: ["Trial"],
        allMounts: [],
    },
    reducers: {
        setFilter: (state, action) => {
            state.appliedFilters = action.payload.onlyInclude
        }
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

const filterByPinnedPlayers = player => player.isPinned
const filterByPlayersWithMounts = player => !!player.mounts
const filterByAppliedFilters = appliedFilters => mount => appliedFilters
    .find(askedSourceType => mount.sources
        .find(mountsSource => askedSourceType === mountsSource.type))

const mapFlat = ({ character: { playerId, name, icon, server }, mounts }) => ({ playerId, name, icon, server, mounts })
const mapMountData = (allMounts) => player => Object.assign({}, player, {
    mounts: allMounts.map((mount) => {
        let obtained = player.mounts[mount.name] ||
            !!Object.keys(player.mounts).find(playersMountName => (playersMountName.includes(mount.name) || mount.name.includes(playersMountName)))

        return Object.assign({}, mount, { obtained })
    })
})
const mapAppliedFilters = appliedFilters => player => Object.assign({}, player, {
    mounts:
        player.mounts.filter(filterByAppliedFilters(appliedFilters))
})
const curry = (...functions) => (player) => functions.reduce((acc, fun) => fun(acc), player)


export const selectPinned = state => Object.values(state.player.players)
    .filter(filterByPinnedPlayers && filterByPlayersWithMounts)
    .map(curry(mapFlat, mapMountData(state.mounts.allMounts), mapAppliedFilters(state.mounts.appliedFilters)))
    .reduce((acc, player) => Object.assign({}, acc, { [player.playerId]: player }), {})

export default mountsSlice.reducer