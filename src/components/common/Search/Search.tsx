import s from "./Search.module.css";
import React, {ChangeEvent, useEffect, useState} from "react";
import SearchResultItem from "../../SearchResulItem/SearchResultItem";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../store/store";
import {SearchDataType} from "../../../store/searchReducerTypes";
import {getSearchResult, resetSearchReducer} from "../../../store/searchReducer";
import {getCity, getCityByID} from "../../../store/weatherReducer";
import Button from "../Button/Button";

type PropsType = {
    onClick: (bool: boolean) => void
}

const Search: React.FC<PropsType> = ({onClick}) => {
    const [value, setValue] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const [errorText, setErrorText] = useState<string>("")
    const [timeoutID, setTimeoutID] = useState<number>(0)
    const [showSearchHelper, setShowSearchHelper] = useState<boolean>(false)

    const dispatch = useDispatch()
    const searchData = useSelector<AppStateType, Array<SearchDataType>>(state => state.search)


    useEffect(() => {
        const id: number = window.setTimeout(() => {
            value.length > 2 && dispatch(getSearchResult(value))
        }, 1000)
        setTimeoutID(id)
        return clearTimeout(timeoutID)
    }, [value])

    useEffect(() => {
        searchData.length ? setShowSearchHelper(true) : setShowSearchHelper(false)
    }, [searchData])

    const onSearchItemClick = (cityID: number) => {
        dispatch(getCityByID(cityID))
        dispatch(resetSearchReducer())
        onClick(false)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setErrorText("")
        setValue(e.currentTarget.value.replace(/\d/, ""))
    }
    const onClickHandler = () => {
        setValue(value.trim())
        if (!value) {
            setError(true)
            setErrorText("Name must not be empty")
        } else if (value.length < 2) {
            setError(true)
            setErrorText("Name must contain more than one character")
        } else {
            dispatch(getCity(value.trim()))
            dispatch(resetSearchReducer())
            onClick(false)
        }
    }


    const errorStyle = error ? `${s.input} ${s.errorStyle}` : s.input

    const searchResult = searchData.length ? searchData.map((s) => <SearchResultItem key={s.id}
                                                                                     name={s.name}
                                                                                     id={s.id}
                                                                                     country={s.sys.country}
                                                                                     onClick={onSearchItemClick}/>) : ""


    return (
        <>
            <label className={s.label}>
                <span className={s.error}>{errorText}</span>
                <input className={errorStyle}
                       type="text"
                       value={value}
                       placeholder="Write here"
                       autoFocus
                       onChange={onChangeHandler}/>

                {showSearchHelper && <ul className={s.searchList}>{searchResult}</ul>}
            </label>
            <Button className={s.send} onClick={onClickHandler}>Отправить</Button>
        </>
    )
}

export default Search;