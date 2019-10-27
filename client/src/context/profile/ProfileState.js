import React, { useReducer, useContext } from "react";
import axios from "../../utils/axios-api";
import ProfileContext from "./profileContext";
import AlertContext from "../alert/alertContext";
import ProfileReducer from "./profileReducer";
import setAuthToken from "../../utils/setAuthToken";
import * as faceapi from "face-api.js";

import {
  SET_PROFILE_STREAM,
  SET_CANVAS_LOCATION,
  SET_PROFILE_PHOTO
} from "../types";

const ProfileState = props => {
  const initialState = {
    profileStream: null,
    imageLocationArr: [],
    photo: null
  };

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [state, dispatch] = useReducer(ProfileReducer, initialState);
  const { profileStream, imageLocationArr, photo } = state;

  const setPhoto = imgSrc => {
    dispatch({ type: SET_PROFILE_PHOTO, payload: imgSrc });
  };

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

  const setFaceCanvas = (videoRef, canvasRef) => {
    const canvas = faceapi.createCanvasFromMedia(videoRef);
    canvasRef.append(canvas);

    const displaySize = {
      width: videoRef.videoWidth * 0.87,
      height: videoRef.videoHeight * 0.87
    };

    faceapi.matchDimensions(canvas, displaySize);

    return {
      displaySize,
      canvas
    };
  };

  const detectFaceArea = async (videoRef, displaySize, canvas) => {
    const detections = await faceapi
      .detectAllFaces(videoRef, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

    const resizeDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizeDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizeDetections);

    if (resizeDetections.length > 0) {
      const image = resizeDetections[0].alignedRect.box;
      dispatch({
        type: SET_CANVAS_LOCATION,
        payload: [image.x, image.y, image.width, image.height]
      });
    }
  };

  const removeStream = stream => {
    stream.getTracks().forEach(track => {
      track.stop();
    });
    dispatch({ type: SET_PROFILE_STREAM, payload: null });
  };

  const updateProfile = async (id, formData) => {
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    try {
      const res = await axios.patch(`/api/users/${id}`, formData, config);
      const { token } = res.data;
      localStorage.token = token;
      setAuthToken(token);
      setAlert("변경이 적용되었습니다");
      
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);

    } catch (error) {
      setAlert("네트워크 오류입니다. 다시 시도해주세요")
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        getStream,
        removeStream,
        profileStream,
        imageLocationArr,
        setFaceCanvas,
        detectFaceArea,
        updateProfile,
        setPhoto,
        photo
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileState;
