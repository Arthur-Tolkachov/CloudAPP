import {hourlyDataAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./store";
import {HourObjectType} from "./hourlyDataReducerTypes";

type ActionType = SetHourlyDataType

export type HourlyStateType = HourObjectType[]
const initialState: HourlyStateType | [] = []

const hourlyDataReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case "SET-HOURLY-DATA": {
            return [...action.data]
        }
        default:
            return state;
    }
}

export const setHourlyData = (data:HourlyStateType[]) => ({type: 'SET-HOURLY-DATA', data} as const)
type SetHourlyDataType = ReturnType<typeof setHourlyData>

export const getHourlyData = (lat: number, lon: number): ThunkAction<void, AppStateType, unknown, ActionType> => (dispatch) => {
    hourlyDataAPI.getData(lat, lon).then((response) => {
        dispatch(setHourlyData(response.data.hourly))
    })
}

export default hourlyDataReducer;