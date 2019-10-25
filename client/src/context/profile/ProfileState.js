import React, { useContext, useReducer } from "react";
import axios from "../../utils/axios-api";
import ProfileContext from "./profileContext";
import ProfileReducer from "./profileReducer";

import { GET_PROFILE_STREAM, CLEAR_PROFILE_STREAM } from "../types";

const ProfileState = props => {
  const initialState = {
    profileStream : null
  };

  const [state, dispatch] = useReducer(ProfileReducer, initialState);
  const { profileStream } = state;

  const getStream = () =>{
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 }
    });
    dispatch({ type: GET_PROFILE_STREAM, payload: stream })
  }

  return (
    <ProfileContext.Provider
      value={{
        getStream,
        profileStream
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileState;
