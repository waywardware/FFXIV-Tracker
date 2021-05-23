import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { apiMiddleware } from 'redux-api-middleware';
import drawerReducer from '../features/drawer/drawerSlice';
import mountsReducer from '../features/mounts/mountsSlice';
import minionsReducer from '../features/minions/minionsSlice';
import searchReducer from '../features/search/searchSlice';
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()
const persistedState = window.sessionStorage.getItem('ffxiv') ? JSON.parse(window.sessionStorage.getItem('ffxiv')) : {}
const store = configureStore({
  preloadedState: persistedState,
  reducer: {
    search: searchReducer,
    mounts: mountsReducer,
    minions: minionsReducer,
    drawer: drawerReducer,
    router: connectRouter(history)
  },
  middleware: [...getDefaultMiddleware(), apiMiddleware]
});
<<<<<<< HEAD

store.subscribe(() => {
  window.sessionStorage.setItem("ffxiv", JSON.stringify(store.getState()))
})

export default store
=======
>>>>>>> 3fa4e0dec6d55e45ab1394c789904dead03d8da7
