import s from "./CardButton.module.css";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import Button from "../Button/Button";

type PropsType = {
    onClick: (bool:boolean) => void
}

const CardButton: React.FC<PropsType> = ({onClick}) => {
    const handler = () => {
        onClick(true)
    }

    return (
        <div className={s.wrapper}>
            <span className={s.title}>Add new place to your cards list</span>
            <Button className={s.btn} onClick={handler}><AddIcon style={{color: "#fff", fontSize: "140px"}}/></Button>
        </div>
    )
}

export default CardButton;