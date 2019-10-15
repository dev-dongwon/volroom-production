import React, { useReducer, useContext } from "react";
import io from "socket.io-client";
import axios from "../../utils/axios-api";
import Peer from "simple-peer";
import wrtc from "wrtc";

import RoomContext from "./roomContext";
import RoomReducer from "./roomReducer";
import AlertContext from "../../context/alert/alertContext";

import {
  RECEIVE_CHAT,
  JOIN_ROOM,
  UPDATE_ROOM,
  SET_LOCAL_STREAM,
  SET_REMOTE_STREAM,
  SET_MY_SOCKET,
  CLEAR_ROOM_STATE
} from "../types";

let socket;
let client = {};
let peer;

const RoomState = props => {
  const initialState = {
    chatList: [],
    userList: {},
    localStream: null,
    remoteStream: null,
    remoteStreamArr: [],
    remotePeerArr: [],
    currentRoom: "",
    mySocketId: null
  };

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [state, dispatch] = useReducer(RoomReducer, initialState);

  const {
    chatList,
    userList,
    currentRoom,
    localStream,
    remoteStream,
    remoteStreamArr,
    remotePeerArr,
    mySocketId
  } = state;

  // Init Peer
  const initPeer = (type, localStream) => {
    peer = new Peer({
      initiator: type === "init" ? true : false,
      wrtc: wrtc,
      stream: localStream,
      trickle: false
    });

    peer.on("stream", stream => {
      setRemoteStream(stream);
    });

    peer.on("close", () => {
      dispatch({ type: SET_REMOTE_STREAM, payload: null });
      dispatch({ type: SET_LOCAL_STREAM, payload: null });
      peer.destory();
    });

    return peer;
  };

  const closePeer = async () => {
    localStream.getTracks().forEach(track => track.stop());
    socket = null;
    client = {};
    peer = null;
  };

  // make Init Peer - signal을 보내는 주체
  const makePeer = (stream, mySocketId, targetSocketId) => {
    peer = initPeer("init", stream);
    client.answer = false;
    client.peer = peer;
    sendOffer(mySocketId, targetSocketId);
  };

  const sendOffer = (mySocketId, targetSocketId) => {
    peer.on("signal", data => {
      if (!client.answer) {
        socket.emit("offer", { data, mySocketId, targetSocketId });
      }
    });
  };

  const backOffer = stream => {
    socket.on("backOffer", data => {
      answerPeer(stream, data);
    });
  };

  // make answer Peer - signal을 받고 answer를 보내는 주체 (참여자)
  const answerPeer = (stream, dataObj) => {
    const { offer, targetSocketId, mySocketId } = dataObj;
    peer = initPeer("notInit", stream);
    peer.on("signal", data => {
      socket.emit("answer", {
        data,
        targetSocketId,
        mySocketId
      });
    });
    peer.signal(offer);
  };

  const setSignal = () => {
    socket.on("backAnswer", data => {
      signalAnswer(data);
    });
  };

  const signalAnswer = data => {
    const { answer } = data;
    client.answer = true;
    peer = client.peer;
    if (answer) {
      peer.signal(answer);
    }
  };

  const setRemoteStream = stream => {
    dispatch({ type: SET_REMOTE_STREAM, payload: stream });
  };

  // join room
  const joinRoom = async (topic, roomId, user) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.get(`/api/rooms/${topic}/${roomId}`, config);
      const currentRoom = res.data;
      dispatch({ type: JOIN_ROOM, payload: currentRoom });

      if (currentRoom !== "") {
        connectRoom(topic, user, roomId, currentRoom);
      }
    } catch (error) {
      console.error(error);
      setAlert("잠시 후 다시 시도해주세요");
    }
  };

  const deleteRoom = async (topic, roomId, user) => {
    try {
      const res = await axios.delete(`/api/rooms/${topic}/${roomId}`);
      console.log(res);
      dispatch({ type: CLEAR_ROOM_STATE, payload: null });
    } catch (error) {
      console.error(error);
      setAlert("잠시 후 다시 시도해주세요");
    }
  };

  // connect Room
  const connectRoom = (namespace, user, roomId, currentRoom) => {
    if (!socket) {
      socket = io(`server-dev.ap-northeast-2.elasticbeanstalk.com/${namespace}`, {
        query: {
          username: user.name,
          roomId: roomId
        }
      });

      enterRoom();
      joinNewMember();
      answerMySocket();
      receiveChat();
      getUserInfo();

      socket.emit("join", roomId);
      socket.emit("mySocket");
    }
  };

  const answerMySocket = () => {
    socket.on("socketAnswer", socketId => {
      dispatch({ type: SET_MY_SOCKET, payload: socketId });
    });
  };

  // receive chat
  const receiveChat = () => {
    socket.on("chat", data => {
      dispatch({ type: RECEIVE_CHAT, payload: data });
    });
  };

  const joinNewMember = () => {
    socket.on("join", data => {
      dispatch({ type: RECEIVE_CHAT, payload: data });
    });
  };

  const getUserInfo = () => {
    socket.on("sendUserInfo", data => {
      if (data) {
        dispatch({ type: UPDATE_ROOM, payload: data });
      }
    });
  };

  const enterRoom = () => {
    socket.on("enter", () => {
      socket.emit("enter");
    });
  };

  // leave Room
  const leaveRoom = () => {
    socket.emit("close");
    socket.close();
    socket = null;
    dispatch({ type: CLEAR_ROOM_STATE, payload: null });
  };

  // send chat
  const sendChat = msgObj => {
    socket.emit("chat", msgObj);
  };

  const windowBackEvent = () => {
    window.addEventListener(
      "popstate",
      event => {
        leaveRoom();
        window.location = document.referrer;
      },
      false
    );
  };

  const exitRoom = () => {
    dispatch({ type: CLEAR_ROOM_STATE, payload: null });
  };

  // set local stream
  const setStream = async streamType => {
    let stream;

    if (streamType === "video") {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: { width: 1280, height: 720 }
      });
    }

    if (streamType === "screen") {
      stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      });
    }

    dispatch({ type: SET_LOCAL_STREAM, payload: stream });
    backOffer(stream);
    setSignal();
  };

  return (
    <RoomContext.Provider
      value={{
        chatList,
        userList,
        leaveRoom,
        sendChat,
        connectRoom,
        windowBackEvent,
        joinRoom,
        localStream,
        remoteStreamArr,
        remotePeerArr,
        currentRoom,
        remoteStream,
        mySocketId,
        makePeer,
        closePeer,
        setStream,
        exitRoom,
        deleteRoom
      }}
    >
      {props.children}
    </RoomContext.Provider>
  );
};

export default RoomState;
