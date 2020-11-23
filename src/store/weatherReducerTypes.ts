export type WeatherDataType = {
    base: string
    clouds: CloudsType
    rain?: RainType
    snow?: SnowType
    cod: number
    coord: CoordType
    dt: number
    id: number
    main: MainType
    name: string
    sys: SysType
    timezone: number
    visibility: number
    weather: Array<WeatherType>
    wind: WindType
}


export type CloudsType = {
    all: number
}

export type RainType = {
    "1h": number
    "3h"?: number
}

export type SnowType = {
    "1h": number
    "3h"?: number
}

export type CoordType = {
    lat: number
    lon: number
}

export type MainType = {
    feels_like: number
    humidity: number
    pressure: number
    temp: number
    temp_max: number
    temp_min: number
}

export type WindType = {
    speed: number
    deg: number
}

export type SysType = {
    country: string
    id: number
    sunrise: number
    sunset: number
    type: number
}

export type WeatherType = {
    description: string
    icon: string
    id: number
    main: string
}