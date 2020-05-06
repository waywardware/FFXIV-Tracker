import store from './store'
import { searchComplete, updatePage, startingSearch } from "../features/search/searchSlice"
import { startingLookup, lookupComplete } from "../features/mounts/mountsSlice"
import { infoFromSearch, mountData } from "../features/player/playerSlice"

const https = require('https');

export const search = (name, page = 1) => {
    if (!name || /^\s*$/.test(name)) return;
    name = name.toLowerCase()
    store.dispatch(startingSearch(name))

    let state = store.getState().search;
    var results
    if ((results = state.results[name]) && (results = results[page])) {
        store.dispatch(updatePage({ current: page, total: results[0] }))
        return;
    }
    https.get(`https://xivapi.com/character/search?name=${name}&page=${page}`, res => {
        let data = '';

        res.on('data', chunk => data += chunk)

        res.on('end', () => {
            let response = JSON.parse(data);
            let p = response.Pagination;
            let r = response.Results;
            store.dispatch(infoFromSearch(r.map(v => ({
                id: v.ID,
                icon: v.Avatar,
                name: v.Name,
                server: v.Server,
            }))))
            store.dispatch(searchComplete(
                {
                    name,
                    page: p.Page,
                    totalPages: p.PageTotal,
                    results: r.map(v => v.ID)
                }))
        })
    }).on('error', console.log)
}

export const getPlayerMountInfo = playerId => {
    let player = store.getState().player;
    let date = Date.now()

    store.dispatch(startingLookup({ playerId, date }))

    if (player && player[playerId] && player[playerId].mounts &&
        player[playerId].mounts.length > 0) {
        store.dispatch(lookupComplete({ playerId }))
    }
    https.get(`https://xivapi.com/character/${playerId}?data=MIMO&extended=0`, res => {
        let data = '';

        res.on('data', chunk => data += chunk)

        res.on('end', () => {
            data = JSON.parse(data)
            store.dispatch(mountData({ playerId, mounts: data.Mounts.map(v => v.Name) }))
            store.dispatch(lookupComplete({ playerId }))
        })
    }).on('error', console.log)
}