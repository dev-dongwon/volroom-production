import React, { useContext, useReducer } from "react";
import axios from "../../utils/axios-api";
import ProfileContext from "./profileContext";
import ProfileReducer from "./profileReducer";
import * as faceapi from "face-api.js";

import { SET_PROFILE_STREAM } from "../types";

const ProfileState = props => {
  const initialState = {
    profileStream: null
  };

  const [state, dispatch] = useReducer(ProfileReducer, initialState);
  const { profileStream } = state;

  const getStream = async () => {
    const setLocalStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { width: 600, height: 400 }
      });
      dispatch({ type: SET_PROFILE_STREAM, payload: stream });
    };

    Promise.all([
      // 얼굴 인식
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      // 눈, 코, 입 인식
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      // 얼굴 위치 인식
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      // 표정 인식
      faceapi.nets.faceExpressionNet.loadFromUri("/models")
    ])
      .then(setLocalStream)
      .catch(err => {
        console.error(err);
      });
  };

  const detectFace = (videoRef, canvasRef) => {
    const canvas = faceapi.createCanvasFromMedia(videoRef);
    canvasRef.append(canvas);

    const displaySize = {
      width: videoRef.videoWidth * 0.87,
      height: videoRef.videoHeight * 0.87
    };

    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      const resizeDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizeDetections);
    }, 100);
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
        profileStream,
        detectFace
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileState;
