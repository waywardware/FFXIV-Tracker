import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import searchReducer from '../features/search/searchSlice'
import playerReducer from '../features/player/playerSlice'
import mountsReducer from '../features/mounts/mountsSlice'
import { apiMiddleware } from 'redux-api-middleware'

export default configureStore({
  reducer: {
    search: searchReducer,
    player: playerReducer,
    mounts: mountsReducer,
  },
  middleware: [...getDefaultMiddleware(), apiMiddleware]
});
