import { createAction } from 'redux-api-middleware'

const collect = "ffxivcollect/"

export const fetchAllMountsRequest = collect+"fetchAllMountsRequest"
export const fetchAllMountsSuccess = collect+"fetchAllMountsSuccess"

export const fetchAllMounts = () => createAction({
    endpoint: 'https://ffxivcollect.com/api/mounts',
    method: 'GET',
    types: [fetchAllMountsRequest, fetchAllMountsSuccess, 'FAILURE']
})