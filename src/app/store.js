import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import searchReducer from '../features/search/searchSlice'
import mountsReducer from '../features/mounts/mountsSlice'
import { apiMiddleware } from 'redux-api-middleware'

export default configureStore({
  reducer: {
    search: searchReducer,
    mounts: mountsReducer,
  },
  middleware: [...getDefaultMiddleware(), apiMiddleware]
});
