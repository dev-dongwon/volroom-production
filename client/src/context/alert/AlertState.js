import React, { useReducer } from "react";
import uuid from "uuid";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";

import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = props => {
  const initialState = [];
  const [state, dispatch] = useReducer(alertReducer, initialState);

  // set Alert
  const setAlert = (msg, open = true) => {
    const id = uuid.v4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, id, open }
    });
    setTimeout(() => {
      removeAlert(id);
    }, 6000);
  };

  // remove Alert
  const removeAlert = id => {
    dispatch({
      type: REMOVE_ALERT,
      payload: id
    });
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
        removeAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
