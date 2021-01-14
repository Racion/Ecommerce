import React from 'react'
import { Redirect, Route } from 'react-router-dom';

export const PublicRoute = ({component, ...options}) => { 
    return <Route {...options} component={component} />
}

export const PrivateRoute = ({isAuth, component, ...options}) => {
    if(isAuth) return <Route {...options} component={component} />
    return <Redirect to="/user/login" />
}