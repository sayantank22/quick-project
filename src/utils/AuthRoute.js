import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { auth } from '../firebase/firebase.utils';

const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.currentUser) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default AuthRoute;
