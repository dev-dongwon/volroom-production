import {
  JOIN_ROOM,
  LEAVE_ROOM,
  RECEIVE_CHAT,
  UPDATE_ROOM,
  SET_LOCAL_STREAM,
  SET_REMOTE_STREAM,
  SET_MY_SOCKET,
  CLEAR_ROOM_STATE,
  SET_CONNECT_LIST
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_CONNECT_LIST: {
      const [mySocketId, targetSocketId] = action.payload;
      state.connectList = [...state.connectList, mySocketId, targetSocketId];
      
      return {
        ...state,
        connectList : new Set(state.connectList)
      }
    }
    case CLEAR_ROOM_STATE: {
      return {
        chatList: [],
        userList: [],
        localStream: null,
        remoteStreamArr: [],
        remotePeerArr: [],
        currentRoom: "",
        mySocketId: null,
        hasStream: false
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
      const filteredList = state.userList.filter(userObj => userObj.username !== user.username);

      return {
        ...state,
        userList: [...filteredList, user]
      };
    case SET_LOCAL_STREAM:
      return {
        ...state,
        localStream: action.payload,
        hasStream: true
      };
    case SET_REMOTE_STREAM:
      return {
        ...state,
        remoteStreamArr: [...state["remoteStreamArr"], action.payload]
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
        currentRoom: "",
        hasStream: false
      };
    default:
      return state;
  }
};
