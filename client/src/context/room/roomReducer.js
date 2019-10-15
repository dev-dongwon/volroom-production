import {
  JOIN_ROOM,
  LEAVE_ROOM,
  RECEIVE_CHAT,
  UPDATE_ROOM,
  SET_LOCAL_STREAM,
  SET_REMOTE_STREAM,
  SET_MY_SOCKET,
  CLEAR_ROOM_STATE
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case CLEAR_ROOM_STATE: {
      return {
        chatList: [],
        userList: {},
        localStream: null,
        remoteStream: null,
        remoteStreamArr: [],
        remotePeerArr: [],
        currentRoom: "",
        mySocketId: null
      };
    }
    case SET_MY_SOCKET: {
      return {
        ...state,
        mySocketId: action.payload
      };
    }
    case UPDATE_ROOM:
      const { user } = action.payload;
      const { username } = user;
      return {
        ...state,
        userList: {
          ...state["userList"],
          ...(state["userList"][username] = user)
        }
      };
    case SET_LOCAL_STREAM:
      return {
        ...state,
        localStream: action.payload
      };
    case SET_REMOTE_STREAM:
      return {
        ...state,
        remoteStream: action.payload
      };
    case JOIN_ROOM:
      return {
        ...state,
        currentRoom: action.payload
      };
    case RECEIVE_CHAT:
      return {
        ...state,
        chatList: [...state["chatList"], action.payload]
      };
    case LEAVE_ROOM:
      return {
        ...state,
        chatList: [],
        userList: [],
        currentRoom: ""
      };
    default:
      return state;
  }
};
