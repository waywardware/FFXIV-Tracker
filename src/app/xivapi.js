import { createAction } from 'redux-api-middleware'

const xivapi = "xivapi/"
export const playerSearchRequest = xivapi + "searchRequest"
export const playerSearchSuccess = xivapi + "searchSuccess"

export const searchForPlayer = (name, page = 1) => createAction({
    endpoint: `https://xivapi.com/character/search?name=${name}&page=${page}`,
    method: 'GET',
    types: [
        {
            type: playerSearchRequest,
            meta: { name }
        },
        {
            type: playerSearchSuccess,
            meta: { name }
        },
        'FAILURE']
})

export const playerInfoRequest = xivapi + "playerInfoRequest"
export const playerInfoSuccess = xivapi + "playerInfoSuccess"

export const getPlayerMountInfo = ({ playerId, forPinned = false }) => createAction({
    endpoint: `https://xivapi.com/character/${playerId}?data=MIMO&extended=0`,
    method: 'GET',
    types: [
        {
            type: playerInfoRequest,
            meta: { playerId, forPinned }
        },
        {
            type: playerInfoSuccess,
            meta: { playerId, forPinned }
        },
        'FAILURE'
    ]
})

export const transformMIMOFromXIVApi = ({ Character, Minions, Mounts }) => {
    let playerInfo = {
        character: {
            playerId: Character.ID,
            icon: Character.Avatar,
            name: Character.Name,
            server: Character.Server
        },
        mounts: {},
        minions: {}
    }
    Mounts.map(v => playerInfo.mounts[v.Name] = true)
    Minions.map(v => playerInfo.minions[v.Name] = true)
    return playerInfo;
}