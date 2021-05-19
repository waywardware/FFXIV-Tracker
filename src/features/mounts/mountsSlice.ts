import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { transformMountDataFromFFXIVCollect } from '../../app/ffxivcollect';
import { CharacterCollectionResult, CollectionItem, PlayerInfo } from '../../models/PlayerInfoModels';
import { CollectionState, COLLECTION_LOADED, COLLECTION_LOADING, createCollectionOptions, IdToItemInfo, selectCollectionMap } from '../../util/CollectionUtils';



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

export const mountsSlice = createSlice<CollectionState, SliceCaseReducers<CollectionState>, any>(
    createCollectionOptions(
        "mounts",
        ["Trial"],
        (playerInfo: PlayerInfo) => Array.from(playerInfo.mounts),
        ({
            fetchAllMountsRequest: (state) => {
                state.loadingState = COLLECTION_LOADING
            },
            fetchAllMountsSuccess: (state, action) => {
                state.fullCollection = action.payload.results
                    .map(transformMountDataFromFFXIVCollect)
                    .sort((a: CollectionItem, b: CollectionItem) => a.itemId - b.itemId)
                    .reduce((acc: IdToItemInfo, val: CollectionItem) => Object.assign({}, acc, { [val.itemId]: val }), {})
                state.loadingState = COLLECTION_LOADED
            },
        })
    ))

export const selectMounts = (state: { mounts: CollectionState }): Array<CharacterCollectionResult<CollectionItem>> => {
    return selectCollectionMap(state.mounts)
}

export const selectAppliedFilters = (state: { mounts: CollectionState }) => state.mounts.appliedFilters
export const selectShowMounts = (state: { mounts: CollectionState }) => Object.values(state.mounts.collectionMap).length > 0
export const selectAreMountsLoading = (state: { mounts: CollectionState }) => state.mounts.playersLoading > 0
export const selectPlayers = (state: { mounts: CollectionState }) => state.mounts.players

export const { toggleFilter, toggleObtained, fetchAllMountsRequest, fetchAllMountsSuccess, playerRemove } = mountsSlice.actions;

export default mountsSlice.reducer