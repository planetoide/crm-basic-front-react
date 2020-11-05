import React from 'react'
import {ConfigProtectRoute} from './ConfigProtectRoute';
import {
    Route,
    Redirect
  } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
        ConfigProtectRoute.isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

export default PrivateRoute
