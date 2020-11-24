import axios from "axios";
import {WeatherDataType} from "../store/weatherReducerTypes";
import {SearchDataType} from "../store/searchReducerTypes";
import {HourlyStateType} from "../store/hourlyDataReducer";

const instance = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5/",
})
const key = "ca71cc9121f92b686ca23cb9135132aa"

type WeatherArrayType = {
    cnt: number
    list: WeatherDataType[]
}

export const weatherAPI = {
    getCities(city: string) {
        return instance.get<WeatherDataType>(`weather?q=${city}&units=metric&appid=${key}`)
    },
    getCitiesById(group: string[]) {
        return instance.get<WeatherArrayType>(`group?id=${group.join(",")}&units=metric&appid=${key}`)
    },
    updateCityData(cityID: number) {
        return instance.get<WeatherArrayType>(`group?id=${cityID}&units=metric&appid=${key}`)
    },
    getOneCityById(id:number) {
        return instance.get<WeatherDataType>(`weather?id=${id}&units=metric&appid=${key}`)
    }
}

type searchAPIType = {
    message: string
    cod: string
    count: number
    list: Array<SearchDataType>
}
export const searchAPI = {
    getSearch(city: string) {
        return instance.get<searchAPIType>(`find?q=${city}&units=metric&appid=${key}`)
    }
}

export const currentCityAPI = {
    getCommonData(cityID:number) {
        return instance.get<WeatherDataType>(`weather?id=${cityID}&units=metric&appid=${key}`)
    }
}

type HourlyDataType = {
    hourly: HourlyStateType[]
}

export const hourlyDataAPI = {
    getData(lat:number, lon:number) {
        return instance.get<HourlyDataType>(`onecall?&lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${key}`)
    }
}