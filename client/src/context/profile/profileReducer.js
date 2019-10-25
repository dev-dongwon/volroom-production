import { GET_PROFILE_STREAM, CLEAR_PROFILE_STREAM } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_PROFILE_STREAM: {
      return {
        ...state,
        profileStream : action.payload
      };
    }
    default:
      return state;
  }
};
