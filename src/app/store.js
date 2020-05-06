import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import searchReducer from '../features/search/searchSlice'
import playerReducer from '../features/player/playerSlice'
import mountsReducer from '../features/mounts/mountsSlice'
import groupReducer from '../features/group/groupSlice'
import { apiMiddleware } from 'redux-api-middleware'

export default configureStore({
  reducer: {
    counter: counterReducer,
    search: searchReducer,
    player: playerReducer,
    mounts: mountsReducer,
    group: groupReducer,
  },
  middleware: [...getDefaultMiddleware(), apiMiddleware]
});
