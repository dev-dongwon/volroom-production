import React, { useContext, useReducer } from "react";
import axios from "../../utils/axios-api";

import LobbyContext from "./lobbyContext";
import LobbyReducer from "./lobbyReducer";
import AlertContext from "../../context/alert/alertContext";

import { MAKE_ROOM, LOAD_ROOMS } from "../types";

const LobbyState = props => {
  const initialState = {
    rooms: [],
    room: ""
  };

  const [state, dispatch] = useReducer(LobbyReducer, initialState);
  const { rooms, room } = state;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  // laod rooms by type
  const loadRoomsByType = async type => {
    try {
      const res = await axios.get(`/api/rooms/${type}`);
      const roomList = res.data;
      dispatch({ type: LOAD_ROOMS, payload: roomList });
    } catch (error) {
      setAlert('네트워크 문제가 발생했습니다. 다시 시도해주세요')
    }
  };

  // load rooms
  const loadRooms = async () => {
    try {
      const res = await axios.get(`/api/rooms`);
      const roomList = res.data;
      dispatch({ type: LOAD_ROOMS, payload: roomList });
    } catch (error) {
      setAlert('네트워크 문제가 발생했습니다. 다시 시도해주세요')
    }
  };

  // make room
  const makeRoom = async (formData, topic) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post(`/api/rooms/${topic}`, formData, config);
      const room = res.data;

      dispatch({ type: MAKE_ROOM, payload: room });
    } catch (error) {
      setAlert('네트워크 문제가 발생했습니다. 다시 시도해주세요')
    }
  };

  return (
    <LobbyContext.Provider
      value={{
        makeRoom,
        loadRooms,
        loadRoomsByType,
        room,
        rooms
      }}
    >
      {props.children}
    </LobbyContext.Provider>
  );
};

export default LobbyState;
