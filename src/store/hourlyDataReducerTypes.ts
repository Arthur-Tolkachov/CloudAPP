export type HourObjectType = {
    clouds: number
    dew_point: number
    dt: number
    feels_like: number
    humidity: number
    pop: number
    pressure: number
    temp: number
    visibility: number
    weather: WeatherDataType[]
    wind_deg: number
    wind_speed: number
}

type WeatherDataType = {
    description: string
    icon: string
    id: number
    main: string
}