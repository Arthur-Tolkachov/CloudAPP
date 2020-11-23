import React, {useEffect, useState} from 'react';
import s from "./App.module.css";
import Card from "./components/Card/Card";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./store/store";
import Title from './components/common/Title/Title';
import CardButton from './components/common/CardButton/CardButton';
import AddForm from "./components/AddForm/AddForm";
import {WeatherDataType} from "./store/weatherReducerTypes";
import CloudIcon from '@material-ui/icons/Cloud';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Message from "./components/common/Message/Message";
import {CommonStateType} from "./store/appReducerTypes";
import {findCityToRemove, getGroupOfCities} from "./store/weatherReducer";

function App() {
    const weather = useSelector<AppStateType, Array<WeatherDataType>>((state) => state.weather)
    const message = useSelector<AppStateType, CommonStateType>((state) => state.common)
    const dispatch = useDispatch()

    const [addMode, setAddMode] = useState<boolean>(false)

    const handler = (bool: boolean) => {
        setAddMode(bool)
    }

    const removeCard = (cardID: number) => {
        dispatch(findCityToRemove(cardID))
    }



    const storage = localStorage.getItem("citiesID")
    const citiesID = storage ? JSON.parse(storage) : []

    useEffect(() => {
        citiesID.length && dispatch(getGroupOfCities(citiesID))
    },[])

    const cards = weather.map((s: WeatherDataType) => <Card key={s.id}
                                                            id={s.id}
                                                            name={s.name}
                                                            temp={s.main.temp}
                                                            sys={s.sys}
                                                            removeCard={removeCard}
                                                            weather={s.weather[0]}/>)

    return (
        <div className={s.app}>
            <Title title="Clouds cards APP" className={s.title}><CloudIcon style={{marginRight:"10px"}}/></Title>
            <div className={s.cardsWrapper}>
                <CardButton onClick={handler}/>
                {cards}
            </div>
            {addMode && <AddForm onSearchFinish={handler}/>}
            <footer className={s.footer}>
                <Title title="You are awesome so have a nice day"><EmojiEmotionsIcon style={{marginRight: "10px"}}/></Title>
            </footer>
            {message.show && <Message message={message.message} error={message.error}/>}
        </div>
    );
}

export default App;
