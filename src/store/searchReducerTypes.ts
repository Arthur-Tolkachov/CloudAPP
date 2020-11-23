export type SearchDataType = {
    id: number
    name: string
    coord: CoordType
    main: MainType
    dt: number
    wind: WindType
    sys: SysType
    rain: null
    snow: null
    clouds: CloudsType
    weather: WeatherType[]
}

export type CoordType = {
    lat: number
    lon: number
}

export type MainType = {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
}

export type WindType = {
    speed: number
    deg: number
}

export type SysType = {
    country: string
}

export type CloudsType = {
    all: number
}

export type WeatherType = {
    id: number
    main: string
    description: string
    icon: string
}