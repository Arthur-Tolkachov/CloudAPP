import {Dispatch} from "redux"
import {weatherAPI} from "../api/api"
import {WeatherDataType} from "./weatherReducerTypes";
import {setMessage} from "./appReducer";
import {AppStateType} from "./store";

type ActionType = AddCityType | AddCitiesGroupType | RemoveCityType
const initialState: Array<WeatherDataType> = []

const weatherReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case "ADD-CITY": {
            const validate = state.find((el) => el.id === action.data.id)
            if(!validate) {
                return [...state, action.data]
            }
            return state
        }
        case "ADD-CITIES-GROUP": {
            return [...state, ...action.data]
        }
        case "REMOVE-CITY": {
            return [...action.data]
        }
        default:
            return state
    }
}

export const addCity = (data: WeatherDataType) => ({type: "ADD-CITY", data} as const)
type AddCityType = ReturnType<typeof addCity>

export const removeCity = (data:WeatherDataType[]) => ({type: "REMOVE-CITY", data} as const)
type RemoveCityType = ReturnType<typeof removeCity>

export const findCityToRemove = (cityID:number) => (dispatch:Dispatch, getState:() => AppStateType) => {
    const storage = localStorage.getItem("citiesID")
    const parsed = storage ? JSON.parse(storage) : []
    const filtered = parsed.filter((el:number) => el !== cityID)
    localStorage.setItem("citiesID", JSON.stringify(filtered))

    const data = getState().weather.filter((el) => el.id !== cityID)
    dispatch(removeCity(data))
}

export const addCitiesGroup = (data: WeatherDataType[]) => ({type: "ADD-CITIES-GROUP", data} as const)
type AddCitiesGroupType = ReturnType<typeof addCitiesGroup>

export const getCity = (city: string) => (dispatch: Dispatch, getState: () => AppStateType) => {
    weatherAPI.getCities(city).then(response => {
        if(response.status === 200) {
            const data = getState().weather.map((el) => el.id)
            localStorage.setItem("citiesID", JSON.stringify([...data, response.data.id]))

            dispatch(addCity(response.data))
            dispatch(setMessage(false, "success", true))
        }
    }).catch((error) => {
        if(error.response.status === 404) {
            dispatch(setMessage(true, error.response.data.message, true))
        }
    })
}


export const getGroupOfCities = (group: string[]) => (dispatch: Dispatch) => {
    weatherAPI.getCitiesById(group).then(response => {
        dispatch(addCitiesGroup(response.data.list))
    })
}

export default weatherReducer