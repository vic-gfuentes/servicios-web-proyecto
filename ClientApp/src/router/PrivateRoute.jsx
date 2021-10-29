import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AppContext from "../context/AppContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AppContext);
  const [currentUser, setCurrentUser] = user;
  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser.role ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default PrivateRoute;
