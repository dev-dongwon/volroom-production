import { GET_LOGS, GET_LOG_TYPES } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_LOGS: {
      return {
        ...state,
        logData: action.payload
      };
    }
    case GET_LOG_TYPES: {
      return {
        ...state,
        type: action.payload
      };
    }
    default:
      return state;
  }
};
