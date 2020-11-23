import React, {useEffect, useState} from "react";
import s from "./SearchResultItem.module.css";


type PropsType = {
    name: string
    country: string
    onClick: (value:string) => void
}
const SearchResultItem:React.FC<PropsType> = ({name, country, onClick}) => {
    const [value, setValue] = useState<string>("")

    useEffect(() => {
        setValue(name)
    }, [name])

    const handler = () => {
        onClick(value)
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