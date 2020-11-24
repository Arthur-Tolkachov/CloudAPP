import React from "react";
import s from "./SearchResultItem.module.css";


type PropsType = {
    name: string
    country: string
    id: number
    onClick: (value:number) => void
}
const SearchResultItem:React.FC<PropsType> = ({name, country, id,onClick}) => {

    const handler = () => {
        onClick(id)
    }

    return (
        <li className={s.item} onClick={handler}>
            <img src={`https://openweathermap.org/images/flags/${country.toLowerCase()}.png`} alt="flag"/>
            <span className={s.country}>{country}</span>
            <span>{name}</span>
        </li>
    )
}

export default SearchResultItem;