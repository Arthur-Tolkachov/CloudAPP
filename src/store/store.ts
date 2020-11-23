import {applyMiddleware, combineReducers, createStore} from "redux"
import thunk from "redux-thunk";
import weatherReducer from "./weatherReducer";
import searchReducer from "./searchReducer";
import appReducer from "./appReducer";

const reducers = combineReducers({
    weather: weatherReducer,
    search: searchReducer,
    common: appReducer
})

export const store = createStore(reducers, applyMiddleware(thunk))
export type AppStateType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store;