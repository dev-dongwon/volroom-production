import { SET_PROFILE_STREAM } from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_PROFILE_STREAM: {
      return {
        ...state,
        profileStream : action.payload
      };
    }
    default:
      return state;
  }
};
