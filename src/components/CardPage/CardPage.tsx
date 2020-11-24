import React, {useEffect} from "react";
import s from "./CardPage.module.css";
import {NavLink, RouteComponentProps, withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentCityByID} from "../../store/currentCityReducer";
import {WeatherDataType} from "../../store/weatherReducerTypes";
import {AppStateType} from "../../store/store";
import Preloader from "../common/Preloader/Preloader";
import {PATH} from "../../Routes";
import Button from "../common/Button/Button";
import CachedIcon from '@material-ui/icons/Cached';
import {HourlyStateType} from "../../store/hourlyDataReducer";
import HourlyElement from "./HourlyElement/HourlyElement";
import HourElement from "./HourElement/HourElement";

type PropsType = {
    id?: string
}

const CardPage: React.FC<RouteComponentProps<PropsType>> = (props) => {
    const id = props.match.params.id && +props.match.params.id
    const dispatch = useDispatch()
    const commonData = useSelector<AppStateType, WeatherDataType | null>(state => state.currentCity)
    const hourlyData = useSelector<AppStateType, HourlyStateType | null>(state => state.hourly)

    const date = new Date()
    const dd = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`
    const mm = date.getMonth() < 10 ? `0${date.getMonth()}` : `${date.getMonth()}`
    const yy = `${date.getFullYear()}`

    useEffect(() => {
        id && dispatch(getCurrentCityByID(id))
    }, [])

    const handler = () => {
        id && dispatch(getCurrentCityByID(id))
    }

    const hourlyTemp = hourlyData && hourlyData.map((el) => <HourlyElement key={el.dt} temp={el.temp}/>)
    const hours = hourlyData && hourlyData.map((el) => <HourElement key={el.dt} dt={el.dt}/>)
    return (
        <div className={s.wrapper}>

            <div className={s.cityName}>
                {commonData
                    ? <>
                        <img className={s.flag}
                             src={`https://openweathermap.org/images/flags/${commonData.sys.country.toLowerCase()}.png`}
                             alt={commonData.weather[0].description}/>
                        <span className={s.name}>{commonData.name}</span>
                        <span className={s.country}>({commonData.sys.country})</span>
                    </>
                    : <Preloader/>}
            </div>

            <div className={s.navigation}>
                <NavLink className={s.backButton} to={PATH.MAIN}>back</NavLink>
                <Button className={s.refreshButton} onClick={handler}><CachedIcon /></Button>
            </div>

            <div className={s.dataWrapper}>
                <div className={s.todayData}>
                    {commonData
                        ? <>
                            <div className={s.todayTitle}>Today {`${dd}.${mm}.${yy}`}</div>
                            <img className={s.todayWeatherIcon} src={`https://openweathermap.org/img/wn/${commonData.weather[0].icon}@2x.png`} alt={commonData.weather[0].description}/>
                            <span className={s.todayDescription}>-{commonData.weather[0].description}-</span>
                            <div className={s.todayBody}>
                                <span className={s.todayTemp}>{Math.round(commonData.main.temp)}°C</span>
                                <div className={s.otherWeatherDataWrapper}>
                                    <div>
                                        <span className={s.otherWeatherData}>Feels like: <span>{Math.round(commonData.main.feels_like)}°C</span></span>
                                        <span className={s.otherWeatherData}>Max temperature: <span>{Math.round(commonData.main.temp_max)}°C</span></span>
                                        <span className={s.otherWeatherData}>Min temperature: <span>{Math.round(commonData.main.temp_min)}°C</span></span>
                                    </div>
                                    <div>
                                        <span className={s.otherWeatherData}>Wind speed: <span>{commonData.wind.speed} m.s.</span></span>
                                        <span className={s.otherWeatherData}>Wind angle: <span>{commonData.wind.deg} deg</span></span>
                                        <span className={s.otherWeatherData}>Pressure: <span>{commonData.main.pressure} hPa</span></span>
                                        <span className={s.otherWeatherData}>Humidity: <span>{commonData.main.humidity} %</span></span>
                                        <span className={s.otherWeatherData}>Visibility: <span>{commonData.visibility / 1000} km</span></span>
                                    </div>
                                </div>
                            </div>
                            </>
                        : <Preloader style={{margin: "0 auto"}}/>}
                </div>
                <div className={s.hourlyWrapper}>
                    <div className={s.desk}>
                        <div className={s.hours}>
                            {hours}
                        </div>
                        <div className={s.items}>
                            {hourlyTemp}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(CardPage);