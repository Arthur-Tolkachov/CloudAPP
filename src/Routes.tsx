import React from "react";
import {Redirect, Route, Switch } from "react-router-dom";
import CardPage from "./components/CardPage/CardPage";
import Main from "./components/Main/Main";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";



export const PATH = {
    MAIN: "/main",
    CARD: `/main/:id`
}

const Routes = () => {
    return (
        <Switch>
            <Route path={"/"} exact render={() => <Redirect to={PATH.MAIN}/>}/>
            <Route exact path={PATH.MAIN} render={() => <Main/>}/>
            <Route path={PATH.CARD} render={() => <CardPage/>}/>
            <Route render={() => <NotFoundPage />}/>
        </Switch>
    );
}

export default Routes;
