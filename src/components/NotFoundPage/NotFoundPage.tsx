import React from "react";
import s from "./NotFoundPage.module.css";
import CloudOffIcon from '@material-ui/icons/CloudOff';
import {NavLink} from "react-router-dom";
import {PATH} from "../../Routes";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const NotFoundPage = () =>
    <div className={s.wrapper}>
        <div className={s.content}>
            <CloudOffIcon style={{fontSize: "50px", color: "#fff"}}/>
            <span className={s.text}>404</span>
            <span className={s.text}>Page not found</span>
            <NavLink className={s.link} to={PATH.MAIN}><ArrowBackIcon style={{marginRight: "2px", fontSize:"20px"}}/>back</NavLink>
        </div>
    </div>

export default NotFoundPage;