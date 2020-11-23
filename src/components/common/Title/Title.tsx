import React from "react";
import s from "./Title.module.css";

type PropsType = {
    title: string
    style?: {}
    className?: string
}
const Title:React.FC<PropsType> = ({title, style, className, children}) => {
    const classes = className || ""

    return(
        <div className={classes}>
            <span className={s.title} style={style}>{children}{title}</span>
        </div>
    )
}

export default Title;