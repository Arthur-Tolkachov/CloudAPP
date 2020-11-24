import React from "react";
import s from "./HourElement.module.css";

type PropsType = {
    dt: number
}

const HourElement:React.FC<PropsType> = ({dt}) => {
    const date = new Date(dt * 1000)
    const hours = date.getHours()
    const dd = date.getDate()
    const mm = date.getMonth()
    const yy = date.getFullYear()

    return (
        <div className={s.wrapper}>
            <div className={s.element}>
                <span className={s.time}>{hours < 10 ? `0${hours}:00` : `${hours}:00`}</span>
                <span className={s.day}>{`${dd}.${mm}.${yy}`}</span>
            </div>
        </div>
    )
}

export default HourElement;