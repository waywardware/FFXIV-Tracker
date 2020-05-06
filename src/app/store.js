import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import searchReducer from '../features/search/searchSlice'
import playerReducer from '../features/player/playerSlice'
import mountsReducer from '../features/mounts/mountsSlice'
import groupReducer from '../features/group/groupSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    search: searchReducer,
    player: playerReducer,
    mounts: mountsReducer,
    group: groupReducer,
  },
});
