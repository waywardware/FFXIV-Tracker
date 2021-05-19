import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { transformMinionDataFromFFXIVCollect } from '../../app/ffxivcollect';
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

export const minionsSlice = createSlice<CollectionState, SliceCaseReducers<CollectionState>, any>(
    createCollectionOptions(
        "minions",
        ["Achievement", "Quest", "Raid"],
        (playerInfo: PlayerInfo) => Array.from(playerInfo.minions),
        ({
            fetchAllMinionsRequest: (state) => {
                state.loadingState = COLLECTION_LOADING
            },
            fetchAllMinionsSuccess: (state, action) => {
                state.fullCollection = action.payload.results
                    .map(transformMinionDataFromFFXIVCollect)
                    .sort((a: CollectionItem, b: CollectionItem) => a.itemId - b.itemId)
                    .reduce((acc: IdToItemInfo, val: CollectionItem) => Object.assign({}, acc, { [val.itemId]: val }), {})
                state.loadingState = COLLECTION_LOADED
            },
        })
    )
)

export const selectMinions = (state: { minions: CollectionState }): Array<CharacterCollectionResult<CollectionItem>> => {
    return selectCollectionMap(state.minions)
}

export const selectAppliedFilters = (state: { minions: CollectionState }) => state.minions.appliedFilters
export const selectShowMinions = (state: { minions: CollectionState }) => Object.values(state.minions.collectionMap).length > 0
export const selectAreMinionsLoading = (state: { minions: CollectionState }) => state.minions.playersLoading > 0
export const selectPlayers = (state: { minions: CollectionState }) => state.minions.players

export const { toggleFilter, toggleObtained, fetchAllMinionsRequest, fetchAllMinionsSuccess, playerRemove } = minionsSlice.actions;

export default minionsSlice.reducer