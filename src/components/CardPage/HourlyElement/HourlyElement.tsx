import React from "react";
import s from "./HourlyElement.module.css";

type PropsType = {
    temp: number
}

const HourlyElement:React.FC<PropsType> = ({temp}) => {
    const celsius = Math.round(temp)
    const showTemp = celsius > 0 ? `+${celsius}` : `${celsius}`

    return (
        <div className={s.element} style={{marginBottom: `${celsius * 10}px`}}>
            {showTemp}
        </div>
    )
}

export default HourlyElement;