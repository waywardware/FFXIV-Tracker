import { createAction } from 'redux-api-middleware'
import { fetchAllMountsRequest, fetchAllMountsSuccess } from '../features/mounts/mountsSlice'
import { fetchAllMinionsRequest, fetchAllMinionsSuccess } from '../features/minions/minionsSlice'
import { CollectionItem } from '../models/PlayerInfoModels'


export const fetchAllMounts = () => createAction({
    endpoint: 'https://ffxivcollect.com/api/mounts',
    method: 'GET',
    types: [fetchAllMountsRequest.type, fetchAllMountsSuccess.type, 'FAILURE']
})

export const transformMountDataFromFFXIVCollect = (data: any): CollectionItem => ({
    icon: data.icon,
    name: data.name,
    obtained: false,
    itemId: data.id,
    sources: data.sources
})

export const fetchAllMinions = () => createAction({
    endpoint: 'https://ffxivcollect.com/api/minions',
    method: 'GET',
    types: [fetchAllMinionsRequest.type, fetchAllMinionsSuccess.type, 'FAILURE']
})

export const transformMinionDataFromFFXIVCollect = (data: any): CollectionItem => ({
    icon: data.icon,
    name: data.name,
    obtained: false,
    itemId: data.id,
    sources: data.sources
})