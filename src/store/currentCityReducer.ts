import {Dispatch} from "redux";
import {currentCityAPI} from "../api/api";
import {WeatherDataType} from "./weatherReducerTypes";
import {setMessage} from "./appReducer";
import {getHourlyData} from "./hourlyDataReducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./store";
import {ActionType as MessageActionType}  from "./appReducer";

type ActionType = SetCurrentCityType
const initialState: WeatherDataType | null = null

const currentCityReducer = (state = initialState, action:ActionType) => {
    switch (action.type) {
        case "SET-CURRENT-CITY": {
            return action.data
        }
        default: return state
    }
}

export const setCurrentCity = (data: WeatherDataType) => ({type: 'SET-CURRENT-CITY', data} as const)
type SetCurrentCityType = ReturnType<typeof setCurrentCity>

export const getCurrentCityByID = (cityID: number):ThunkAction<void, AppStateType, unknown, ActionType | MessageActionType> => (dispatch) => {
    currentCityAPI.getCommonData(cityID).then((response) => {
        const lat = response.data.coord.lat
        const lon = response.data.coord.lon

        dispatch(setCurrentCity(response.data))
        dispatch(getHourlyData(lat, lon))
        dispatch(setMessage(false, `${response.data.name} was updated`, true))
    }).catch((error) => {
        dispatch(setMessage(true, `${error.response.data.message}`, true))
    })
}

export default currentCityReducer;