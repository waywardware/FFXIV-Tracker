import { createAction, CreateSliceOptions, SliceCaseReducers, ValidateSliceCaseReducers } from "@reduxjs/toolkit"
import { transformMIMOFromXIVApi } from "../app/xivapi";
import { Character, CharacterCollectionResult, CollectionItem, PlayerInfo } from "../models/PlayerInfoModels"

export const COLLECTION_UNLOADED = 1;
export const COLLECTION_LOADING = 2;
export const COLLECTION_LOADED = 3;

export interface CollectionState {
    loadingState: number
    playersLoading: number
    forcedObtained: PlayerIdToArrayOfForcedObtainedItemIds
    appliedFilters: Array<string>
    players: Array<string>,
    collectionMap: PlayerIdToCharacterInfoWithObtainedItems,
    fullCollection: IdToItemInfo,
}

export interface test {
    map(playerId: string): CharacterCollectionResult<CollectionItem>;
}

export declare type PlayerIdToArrayOfForcedObtainedItemIds = {
    [K: string]: Array<number>
}

export declare type PlayerIdToCharacterInfoWithObtainedItems = {
    [K: string]: CharacterInfoWithObtainedItems
}

export declare type IdToItemInfo = {
    [K: string]: CollectionItem
}

export interface CharacterInfoWithObtainedItems extends Character {
    items: Array<number>
}

const filterByAppliedFilters = (appliedFilters: Array<string>) => (item: CollectionItem) => {
    if (appliedFilters.length === 0) return true;
    return appliedFilters
        .find(askedSourceType => item.sources
            .find((mountsSource: any) => askedSourceType === mountsSource.type))
}

export const PlayerInfoRequest = createAction<{ playerId: string }>("PLAYER_INFO_REQUEST")
export const PlayerInfoSuccess = createAction<any>("PLAYER_INFO_SUCCESS")
export const PlayerUnpinned = createAction<{ playerId: string }>("PLAYER_UNPINNED")

export const selectCollectionMap: (state: CollectionState) => Array<CharacterCollectionResult<CollectionItem>> =
    (state) => {
        let fullCollection = state.fullCollection
        let collectionMap = state.collectionMap
        let forcedObtained = state.forcedObtained

        return state.players
            .filter((playerId: string) => !!collectionMap[playerId])
            .map((playerId: string): CharacterCollectionResult<CollectionItem> => {
                let { name, icon, server, items } = collectionMap[playerId]
                let allMountsCopy: IdToItemInfo = JSON.parse(JSON.stringify(fullCollection))
                items
                    .concat((forcedObtained[playerId]) ? forcedObtained[playerId] : [])
                    .forEach((mountId: number) => {
                        allMountsCopy[mountId].obtained = true
                    })

                return ({
                    character: {
                        name,
                        playerId,
                        icon,
                        server
                    },
                    collection: Object.values(allMountsCopy)
                        .filter(filterByAppliedFilters(state.appliedFilters))
                })
            })
    }
export const createCollectionOptions = (
    name: string,
    defaultFilters: string[],
    collectionExtractor: (playerInfo: PlayerInfo) => Array<string>,
    additionalReducers: ValidateSliceCaseReducers<CollectionState, SliceCaseReducers<CollectionState>>,
    initialState: CollectionState = ({
        loadingState: COLLECTION_UNLOADED,
        playersLoading: 0,
        forcedObtained: {},
        appliedFilters: defaultFilters,
        players: [],
        collectionMap: {},
        fullCollection: {},
    }),
): CreateSliceOptions<CollectionState, SliceCaseReducers<CollectionState>, any> => ({
    name: name,
    initialState: initialState,
    reducers: {
        ...additionalReducers,
        toggleFilter: ({ appliedFilters }, action) => {
            let { filter } = action.payload

            let index = appliedFilters.indexOf(filter)
            index > -1 ? appliedFilters.splice(index, 1) :
                appliedFilters.push(filter)
        },
        setFilters: ({ appliedFilters }, action) => {
            appliedFilters.splice(0, appliedFilters.length)
            appliedFilters.push(...action.payload.selectedFilters)
        },
        toggleObtained: ({ forcedObtained }, action) => {
            let { playerId, mountId } = action.payload
            if (!forcedObtained[playerId]) forcedObtained[playerId] = []

            let playerForcedObtained = forcedObtained[playerId]
            let index = playerForcedObtained.indexOf(mountId)
            index > -1 ? playerForcedObtained.splice(index, 1) : playerForcedObtained.push(mountId)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(PlayerInfoRequest, (state, action) => {
            const { playerId } = action.payload

            state.playersLoading++

            let index = state.players.indexOf(playerId)
            if (index === -1) {
                state.players.push(playerId)
            }
        })
            .addCase(PlayerInfoSuccess, (state, action) => {
                let data = transformMIMOFromXIVApi(action.payload)
                let character = data.character
                let items = collectionExtractor(data)
                let itemIds = items.map(item => {
                    let detailed = state.fullCollection[item] ||
                        Object.values(state.fullCollection).find(({ name }) => (name.includes(item) || item.includes(name)))
                    return detailed.itemId
                })
                state.collectionMap[character.playerId] = {
                    name: character.name,
                    playerId: character.playerId,
                    icon: character.icon,
                    server: character.server,
                    items: itemIds
                }
                state.playersLoading--
            })
            .addCase(PlayerUnpinned, (state, action) => {
                const { playerId } = action.payload

                const index = state.players.indexOf(playerId)
                if (index > -1) {
                    state.players.splice(index, 1)
                }
            })
    }
})