import React, { useContext, useReducer } from "react";
import axios from "../../utils/axios-api";
import ProfileContext from "./profileContext";
import ProfileReducer from "./profileReducer";

import { SET_PROFILE_STREAM } from "../types";

const ProfileState = props => {
  const initialState = {
    profileStream: null
  };

  const [state, dispatch] = useReducer(ProfileReducer, initialState);
  const { profileStream } = state;

  const getStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { width: 600, height: 400 }
    });
    dispatch({ type: SET_PROFILE_STREAM, payload: stream });
  };

  const removeStream = stream => {
    stream.getTracks().forEach(track => {
      track.stop();
    });
    dispatch({ type: SET_PROFILE_STREAM, payload: null });
  };

  return (
    <ProfileContext.Provider
      value={{
        getStream,
        removeStream,
        profileStream
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileState;
