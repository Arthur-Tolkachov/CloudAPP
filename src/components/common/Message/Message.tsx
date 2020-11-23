import React, {useEffect, useState} from "react";
import s from "./Message.module.css";
import {useDispatch} from "react-redux";
import {setMessage} from "../../../store/appReducer";

type PropsType = {
    message: string
    error: boolean
}

const Message:React.FC<PropsType> = ({message, error}) => {
    const dispatch = useDispatch()
    const [timeoutID, setTimeoutID] = useState<number>(0)
    const progressDuration = 3000

    useEffect(() => {
        const id:number = window.setTimeout(() => {
            dispatch(setMessage(false, "", false))
        }, progressDuration)
        setTimeoutID(id)
        return clearTimeout(timeoutID)
    },[])

    const messageStyle = error ? `${s.message} ${s.error}` : s.message

    return (
        <div className={messageStyle}>
            <div className={s.progressbar} style={{animationDuration: `${progressDuration}ms`}}></div>
            {message}
        </div>
    )
}

export default Message;