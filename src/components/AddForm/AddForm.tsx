import React from "react";
import s from "./AddMode.module.css";
import Title from "../common/Title/Title";
import CloseIcon from '@material-ui/icons/Close';
import Button from "../common/Button/Button";
import Search from "../common/Search/Search";
import LocationCityIcon from '@material-ui/icons/LocationCity';

type PropsType = {
    onSearchFinish: (bool: boolean) => void
}

const AddForm: React.FC<PropsType> = ({onSearchFinish}) => {
    const onCloseClick = () => {
         onSearchFinish(false)
    }


    return (
        <div className={s.wrapper}>
            <div className={s.mask} onClick={onCloseClick}></div>
            <div className={s.form}>
                <Title title="Enter the required location"><LocationCityIcon style={{marginRight:"10px"}}/></Title>
                <Search onClick={onSearchFinish}/>
                <Button className={s.close} onClick={onCloseClick}><CloseIcon style={{color: "#000"}}/></Button>
            </div>
        </div>
    )
}

export default AddForm;