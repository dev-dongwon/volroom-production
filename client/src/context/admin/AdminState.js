import React, { useReducer } from "react";
import AdminContext from "./adminContext";
import adminReducer from "./adminReducer";
import { GET_LOGS, GET_LOG_TYPES } from "../types";
import axios from "../../utils/axios-api";

const AdminState = props => {
  const initialState = {
    logData: [],
    type: "browser"
  };

  const [state, dispatch] = useReducer(adminReducer, initialState);
  const { logData, type } = state;

  const loadData = async () => {
    try {
      const res = await axios.get("/api/logs");
      dispatch({ type: GET_LOGS, payload: res.data });
    } catch (error) {}
  };

  const changeType = type => {
    dispatch({ type: GET_LOG_TYPES, payload: type });
  };

  return (
    <AdminContext.Provider
      value={{
        logData,
        loadData,
        changeType,
        type
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
