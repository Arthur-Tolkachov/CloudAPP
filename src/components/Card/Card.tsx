import React from "react";
import s from "./Card.module.css";
import Title from "../common/Title/Title";
import cloudImg from "../../assets/weather/cloud.jpg"
import rainImg from "../../assets/weather/rain.jpg"
import snowImg from "../../assets/weather/snow.jpg"
import hazeImg from "../../assets/weather/haze.jpg"
import clearImg from "../../assets/weather/clear.jpg"
import CloseIcon from '@material-ui/icons/Close';
import CachedIcon from '@material-ui/icons/Cached';
import {SysType, WeatherType} from "../../store/weatherReducerTypes";
import Button from "../common/Button/Button";


type PropsType = {
    name: string
    id: number
    temp: number
    sys: SysType
    weather: WeatherType
    removeCard: (cardID: number) => void
}

const date = new Date()
const dd = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`
const mm = date.getMonth() < 10 ? `0${date.getMonth()}` : `${date.getMonth()}`
const yy = `${date.getFullYear()}`

const Card: React.FC<PropsType> = ({name, id, temp, weather, sys, removeCard}) => {
    let weatherBg: string = clearImg
    switch (weather.main) {
        case "Snow":
            weatherBg = snowImg
            break
        case "Clear":
            weatherBg = clearImg
            break
        case "Rain":
            weatherBg = rainImg
            break
        case "Clouds":
            weatherBg = cloudImg
            break
        case "Haze":
            weatherBg = hazeImg
            break
        case "Mist":
            weatherBg = hazeImg
            break
    }

    const onRemoveClick = () => {
        removeCard(id)
    }

    return (
        <div className={s.card}>
            <img className={s.bg} src={weatherBg} alt="weather"/>
            <Title title={`${name} (${sys.country})`} className={s.title}><img style={{marginRight: "10px"}}
                                                                               src={`https://openweathermap.org/images/flags/${sys.country.toLowerCase()}.png`}
                                                                               alt=""/></Title>
            <div className={s.info}>
                <img className={s.icon} src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt=""/>
                <span className={s.date}>{`${dd}.${mm}.${yy}`}</span>
                <span className={s.temp}>{`${Math.round(temp)}°C`}</span>
                <span className={s.description}>{weather.description} in {name}</span>
            </div>
            <div className={s.buttons}>
                <button className={s.refresh}><CachedIcon style={{color: "#fff"}}/></button>
                <Button onClick={onRemoveClick} className={s.remove}><CloseIcon style={{color: "#fff"}}/></Button>
            </div>
        </div>
    )
}

export default Card;