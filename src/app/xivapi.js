import store from './store'
import { createAction } from 'redux-api-middleware'
import { playerSearchSuccess, updatePage, playerSearchRequest } from "../features/search/searchSlice"
import { playerInfoSuccess } from "../features/player/playerSlice"

const https = require('https');

export const searchForPlayer = (name, page = 1) => createAction({
    endpoint: `https://xivapi.com/character/search?name=${name}&page=${page}`,
    method: 'GET',
    types: [
        {
            type: playerSearchRequest.type,
            meta: name
        },
        {
            type: playerSearchSuccess.type,
            meta: name
        },
        'FAILURE']
})

export const getPlayerMountInfo = ({ playerId }) => createAction({
    endpoint: `https://xivapi.com/character/${playerId}?data=MIMO&extended=0`,
    method: 'GET',
    types: [
        'REQUEST',
        {
            type: playerInfoSuccess.type,
            meta: playerId
        },
        'FAILURE'
    ]
})