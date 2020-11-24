import s from "./Main.module.css";
import CardButton from "../common/CardButton/CardButton";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {WeatherDataType} from "../../store/weatherReducerTypes";
import {findCityToRemove, getGroupOfCities, getRefreshedCity} from "../../store/weatherReducer";
import Card from "../Card/Card";
import AddForm from "../AddForm/AddForm";

const Main = () => {
    const weather = useSelector<AppStateType, Array<WeatherDataType>>((state) => state.weather)
    const dispatch = useDispatch()
    const [addMode, setAddMode] = useState<boolean>(false)


    const handler = (bool: boolean) => {
        setAddMode(bool)
    }

    const removeCard = (cardID: number) => {
        dispatch(findCityToRemove(cardID))
    }

    const refreshCard = (cardID: number) => {
        dispatch(getRefreshedCity(cardID))
    }


    const storage = localStorage.getItem("citiesID")
    const citiesID = storage ? JSON.parse(storage) : []

    useEffect(() => {
        !weather.length && citiesID.length && dispatch(getGroupOfCities(citiesID))
    }, [])

    const cards = weather.map((s: WeatherDataType) => <Card key={s.id}
                                                            id={s.id}
                                                            name={s.name}
                                                            temp={s.main.temp}
                                                            sys={s.sys}
                                                            removeCard={removeCard}
                                                            refreshCard={refreshCard}
                                                            weather={s.weather[0]}/>)

    return (
        <>
            <div className={s.cardsWrapper}>
                <CardButton onClick={handler}/>
                {cards}
            </div>
            {addMode && <AddForm onSearchFinish={handler}/>}
        </>
    )
}

export default Main;