import { createAction } from 'redux-api-middleware'
import {fetchAllMountsRequest, fetchAllMountsSuccess} from '../features/mounts/mountsSlice'


export const fetchAllMounts = () => createAction({
    endpoint: 'https://ffxivcollect.com/api/mounts',
    method: 'GET',
    types: [fetchAllMountsRequest.type, fetchAllMountsSuccess.type, 'FAILURE']
})