import { createAction } from 'redux-api-middleware'
import { playerSearchRequest, playerSearchSuccess } from '../features/search/searchSlice'
import { PlayerInfo } from '../models/PlayerInfoModels'
import { PaginatedResult } from '../models/SearchModels'
import { PlayerInfoRequest, PlayerInfoSuccess } from '../util/CollectionUtils'


export const searchForPlayer = (name: any, page = 1) => createAction({
    endpoint: `https://xivapi.com/character/search?name=${name}&page=${page}`,
    method: 'GET',
    types: [
        {
            type: playerSearchRequest.type,
            meta: { name }
        },
        {
            type: playerSearchSuccess.type,
            meta: { name }
        },
        'FAILURE']
})

export const getPlayerMountInfo = ({ playerId, forPinned = false }: any) => createAction({
    endpoint: `https://xivapi.com/character/${playerId}?data=MIMO&extended=0`,
    method: 'GET',
    types: [
        {
            type: PlayerInfoRequest.type,
            payload : {
                playerId: playerId
            }
        },
        {
            type: PlayerInfoSuccess.type,
        },
        'FAILURE'
    ]
})

export const transformSearchFromXIVApi: (payload: any) => PaginatedResult<PlayerInfo> = (payload: any) =>
({
    page: {
        current: payload.Pagination.Page,
        total: payload.Pagination.PageTotal,
    },
    results: payload.Results.map((r: any) => ({
        icon: r.Avatar,
        playerId: r.ID,
        name: r.Name,
        server: r.Server,
    }))
})

export const transformMIMOFromXIVApi: (serviceDataModel: any) => PlayerInfo = ({ Character, Minions, Mounts }: any) => {
    let playerInfo: PlayerInfo = {
        character: {
            playerId: Character.ID,
            icon: Character.Avatar,
            name: Character.Name,
            server: Character.Server
        },
        mounts: new Set(),
        minions: new Set()
    }
    if (Mounts) {
        Mounts.map((v: any) => playerInfo.mounts.add(v.Name))
    }
    if (Minions) {
        Minions.map((v: any) => playerInfo.minions.add(v.Name))
    }
    return playerInfo;
}