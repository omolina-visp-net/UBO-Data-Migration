import React from "react";
import {Redirect, Route} from "react-router-dom";
import jwtClient from "jwt-client";

const verifyToken = () => {
    const authToken = localStorage.getItem("Importer.token");
    let decodedJwtTokenRequest;
    try {
        decodedJwtTokenRequest = jwtClient.read(authToken);
    } catch (err) {
        console.log(err)
        console.log("Corrupted Token! Please relogin to get new token!");
        return false;
    }

    if (!authToken) {
        return false;
    }

    if (!decodedJwtTokenRequest) {
        return false;
    } else if (!decodedJwtTokenRequest.claim) {
        return false;
    }

    try {
        if (!jwtClient.validate(authToken)) {
            return false;
        }
    } catch (err) {
        return false;
    }
    return authToken;
};

export const PrivateRoute = ({component: Component, render: Render, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props =>
                verifyToken() ? (
                    Component ? (
                        <Component {...props} />
                    ) : (
                        <Render {...props} />
                    )
                ) : (
                    <Redirect
                        to={{pathname: "/login", state: {from: props.location}}}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
