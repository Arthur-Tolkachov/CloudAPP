import React from 'react';
import s from "./App.module.css";
import {useSelector} from "react-redux";
import {AppStateType} from "./store/store";
import Title from './components/common/Title/Title';
import CloudIcon from '@material-ui/icons/Cloud';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Message from "./components/common/Message/Message";
import {CommonStateType} from "./store/appReducerTypes";
import Routes from './Routes';

function App() {
    const message = useSelector<AppStateType, CommonStateType>((state) => state.common)

    return (
        <div className={s.app}>
            <Title title="Clouds cards APP" className={s.title}><CloudIcon style={{marginRight: "10px"}}/></Title>
            <Routes/>
            <footer className={s.footer}>
                <Title title="You are awesome so have a nice day"><EmojiEmotionsIcon
                    style={{marginRight: "10px"}}/></Title>
            </footer>
            {message.show && <Message message={message.message} error={message.error}/>}
        </div>
    );
}

export default App;
