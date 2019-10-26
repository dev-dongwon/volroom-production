import { SET_PROFILE_STREAM, SET_CANVAS_LOCATION } from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_PROFILE_STREAM: {
      return {
        ...state,
        profileStream: action.payload
      };
    }
    case SET_CANVAS_LOCATION: {
      return {
        ...state,
        imageLocationArr: [...action.payload]
      };
    }
    default:
      return state;
  }
};
