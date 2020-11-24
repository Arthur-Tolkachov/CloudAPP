import React from "react";
import s from "./Preloader.module.css";

type PropsType = {
    style?: {}
}
const Preloader:React.FC<PropsType> = ({style}) => {
    return (
        <div style={style} className={s.preloader}></div>
    )
}

export default Preloader;