import { createSlice } from '@reduxjs/toolkit';
import { fetchAllMountsRequest, fetchAllMountsSuccess } from '../../app/ffxivcollect'

export const UNLOADED = 1;
export const LOADING = 2;
export const LOADED = 3;

export const POSSIBLE_FILTERS = [
    "Achievement",
    "Crafting",
    "Deep Dungeon",
    "Dungeon",
    "Eureka",
    "Event",
    "Feast",
    "Limited",
    "Other",
    "Premium",
    "Purchase",
    "Quest",
    "Raid",
    "Trial"
]
export const mountsSlice = createSlice({
    name: 'mounts',
    initialState: {
        allMountData: UNLOADED,
        forcedObtained: {},
        playerId: 0,
        appliedFilters: ["Trial"],
        allMounts: [],
    },
    reducers: {
        toggleFilter: ({ appliedFilters }, action) => {
            let { filter } = action.payload

            let index = appliedFilters.indexOf(filter)
            index > -1 ? appliedFilters.splice(index, 1) :
                appliedFilters.push(filter)
        },
        toggleObtained: ({ forcedObtained }, action) => {
            let { playerId, mountId } = action.payload
            if (!forcedObtained[playerId]) forcedObtained[playerId] = []

            let index = forcedObtained[playerId].indexOf(mountId)
            index > -1 ? forcedObtained[playerId].splice(index, 1) :
                forcedObtained[playerId].push(mountId)
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
const filterByAppliedFilters = appliedFilters => mount => {
    if (appliedFilters.length === 0) return true;
    return appliedFilters
        .find(askedSourceType => mount.sources
            .find(mountsSource => askedSourceType === mountsSource.type))
}

const mapFlat = ({ character: { playerId, name, icon, server }, mounts }) => ({ playerId, name, icon, server, mounts })

const mapMountData = (allMounts, forcedObtained) => player => Object.assign({}, player, {
    mounts: allMounts.map((mount) => {
        let obtained = player.mounts[mount.name] ||
            !!Object.keys(player.mounts).find(playersMountName => (playersMountName.includes(mount.name) || mount.name.includes(playersMountName)))

        return Object.assign({}, mount, {
            obtained: obtained
                || (forcedObtained[player.playerId] && forcedObtained[player.playerId].includes(mount.id))
        })
    })
})

const mapAppliedFilters = appliedFilters => player => Object.assign({}, player, {
    mounts: player.mounts.filter(filterByAppliedFilters(appliedFilters))
})

export const selectPinned = state => Object.values(state.player.players)
    .filter(filterByPinnedPlayers)
    .filter(filterByPlayersWithMounts)
    .map(mapFlat)
    .map(mapMountData(state.mounts.allMounts, state.mounts.forcedObtained))
    .map(mapAppliedFilters(state.mounts.appliedFilters))
    .reduce((acc, player) => Object.assign({}, acc, { [player.playerId]: player }), {})

export const selectAppliedFilters = state => state.mounts.appliedFilters

export const { toggleObtained, toggleFilter } = mountsSlice.actions

export default mountsSlice.reducer