import { MAKE_ROOM, LOAD_ROOMS } from "../types";

export default (state, action) => {
  switch (action.type) {
    case MAKE_ROOM:
      return {
        ...state,
        room: action.payload
      };
    case LOAD_ROOMS:
      return {
        ...state,
        rooms: action.payload
      };

    default:
      return state;
  }
};
