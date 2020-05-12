import { createSlice } from '@reduxjs/toolkit';
import { transformMIMOFromXIVApi } from '../../app/xivapi';

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
        status: UNLOADED,
        forcedObtained: {},
        playerId: 0,
        appliedFilters: ["Trial"],
        mountMap: {},
        allMounts: {},
    },
    reducers: {
        toggleFilter: ({ appliedFilters }, action) => {
            let { filter } = action.payload

            let index = appliedFilters.indexOf(filter)
            index > -1 ? appliedFilters.splice(index, 1) :
                appliedFilters.push(filter)
        },
        toggleObtained: ({ forcedObtained, mountMap }, action) => {
            let { playerId, mountId } = action.payload
            if (!forcedObtained[playerId]) forcedObtained[playerId] = []

            let index = forcedObtained[playerId].indexOf(mountId)
            index > -1 ? forcedObtained[playerId].splice(index, 1) :
                forcedObtained[playerId].push(mountId)
        },
        fetchAllMountsRequest: (state) => {
            state.allMountData = LOADING
        },
        fetchAllMountsSuccess: (state, action) => {
            state.allMounts = action.payload.results
                .sort((a, b) => a.id - b.id)
                .reduce((acc, val) => Object.assign({}, acc, { [val.id]: val }), {})
            state.allMountData = LOADED
        },
        playerInfoRequest: (state, action) => {
            state.status = LOADING
        },
        playerInfoSuccess: (state, action) => {
            state.status = LOADED
            let { mounts, character } = transformMIMOFromXIVApi(action.payload)
            let mountIds = Object.keys(mounts).map(mount => {
                let detailed = state.allMounts[mount] ||
                    Object.values(state.allMounts).find(({ name }) => (name.includes(mount) || mount.includes(name)))
                return detailed.id
            })
            state.mountMap[character.playerId] = {
                name: character.name,
                playerId: character.playerId,
                icon: character.icon,
                server: character.server,
                mounts: mountIds
            }
        }
    },
})

const filterByAppliedFilters = appliedFilters => mount => {
    if (appliedFilters.length === 0) return true;
    return appliedFilters
        .find(askedSourceType => mount.sources
            .find(mountsSource => askedSourceType === mountsSource.type))
}

export const selectMounts = state => {
    let allMounts = state.mounts.allMounts
    let mountMap = state.mounts.mountMap
    let forcedObtained = state.mounts.forcedObtained
    let joinedMounts = []

    Object.values(mountMap).forEach(({ name, playerId, icon, server, mounts }) => {
        let allMountsCopy = JSON.parse(JSON.stringify(allMounts))
        mounts
            .concat((forcedObtained[playerId]) ? forcedObtained[playerId] : [])
            .forEach(mountId => {
                allMountsCopy[mountId].obtained = true
            })

        joinedMounts.push({
            name,
            playerId,
            icon,
            server,
            mounts: Object.values(allMountsCopy).filter(filterByAppliedFilters(state.mounts.appliedFilters))
        })
    })

    return joinedMounts
}
export const selectAppliedFilters = state => state.mounts.appliedFilters
export const selectShowMounts = state => Object.values(state.mounts.mountMap).length > 0

export const { toggleFilter, toggleObtained, fetchAllMountsRequest, fetchAllMountsSuccess, playerInfoRequest, playerInfoSuccess } = mountsSlice.actions;

export default mountsSlice.reducer