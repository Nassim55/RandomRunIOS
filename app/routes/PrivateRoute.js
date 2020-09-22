import React from 'react';
import { Route, Redirect } from 'react-router-native';
import { useSelector } from 'react-redux';

const PrivateRoute = ({component: Component, ...rest}) => {
    const isUserAuthenticated = useSelector(state => state.isUserAuthenticated);
    return <Route 
    {...rest}
    render={props => (
        isUserAuthenticated ? <Component {...props} /> : <Redirect to='/' />
    )}
    />
};

export default PrivateRoute;