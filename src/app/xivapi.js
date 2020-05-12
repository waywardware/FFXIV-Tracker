import { createAction } from 'redux-api-middleware'
import { playerSearchRequest, playerSearchSuccess} from '../features/search/searchSlice'
import { playerInfoRequest, playerInfoSuccess } from '../features/mounts/mountsSlice'


export const searchForPlayer = (name, page = 1) => createAction({
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

export const getPlayerMountInfo = ({ playerId, forPinned = false }) => createAction({
    endpoint: `https://xivapi.com/character/${playerId}?data=MIMO&extended=0`,
    method: 'GET',
    types: [
        {
            type: playerInfoRequest.type,
            meta: { playerId }
        },
        {
            type: playerInfoSuccess.type,
            meta: { playerId }
        },
        'FAILURE'
    ]
})

export const transformSearchFromXIVApi = (payload) =>
    ({
        page: {
            current: payload.Pagination.Page,
            total: payload.Pagination.PageTotal,
        },
        results: payload.Results.map(r => ({
            icon: r.Avatar,
            playerId: r.ID,
            name: r.Name,
            server: r.Server,
        }))
    })

export const transformMIMOFromXIVApi = ({ Character, Minions, Mounts }) => {
    let playerInfo = {
        character: {
            playerId: Character.ID,
            icon: Character.Avatar,
            name: Character.Name,
            server: Character.Server
        },
        mounts: [],
        minions: {}
    }
    Mounts.map(v => playerInfo.mounts[v.Name] = true)
    Minions.map(v => playerInfo.minions[v.Name] = true)
    return playerInfo;
}