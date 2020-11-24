import {applyMiddleware, combineReducers, createStore} from "redux"
import thunk from "redux-thunk";
import weatherReducer from "./weatherReducer";
import searchReducer from "./searchReducer";
import appReducer from "./appReducer";
import currentCityReducer from "./currentCityReducer";
import hourlyDataReducer from "./hourlyDataReducer";

const reducers = combineReducers({
    weather: weatherReducer,
    search: searchReducer,
    common: appReducer,
    currentCity: currentCityReducer,
    hourly: hourlyDataReducer
})

export const store = createStore(reducers, applyMiddleware(thunk))
export type AppStateType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store;