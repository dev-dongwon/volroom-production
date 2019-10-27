import React, { useContext, useState, useEffect, useRef } from "react";
import urlToBlob from "canvas-to-blob";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal, Grid } from "@material-ui/core";
import ReactPlayer from "react-player";
import ProfileContext from "../../context/profile/profileContext";
import AuthContext from "../../context/auth/authContext";
import useInterval from "use-interval";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  subTypo: {
    fontWeight: "600",
    fontSize: "20px",
    margin: theme.spacing(3),
    color: "black"
  },
  contentTypo: {
    fontWeight: "100",
    fontSize: "15px",
    margin: theme.spacing(3),
    color: "black"
  },
  gridContainer: {
    padding: "2%",
    paddingTop: "1%"
  },
  profilePhotoArea: {
    height: "230px",
    width: "230px",
    borderRadius: "50%",
    overflow: "hidden",
    display: "flex",
    AlignItems: "center",
    justifyContent: "center"
  },
  photoWrapper: {
    display: "flex",
    AlignItems: "center",
    justifyContent: "center"
  },
  profilePhoto: {
    width: "100%",
    height: "100%",
    margin: "auto"
  },
  paper: {
    background: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "60%",
    height: "73%",
    marginLeft: "20%",
    borderRadius: "15px",
    marginTop: "5%"
  },
  buttonArea: {
    textAlign: "center",
    marginTop: "15px"
  },
  textField: {
    margin: "4%",
    marginTop: "0",
    paddingRight: "5%"
  },
  deleteBtn: {
    margin: theme.spacing(3),
    marginTop: "0",
    float: "right",
    width: "300px",
    height: "45px",
    marginRight: "3%"
  },
  contentArea: {
    marginBottom: "5%"
  },
  profileSnapshot: {
    textAlign: "center",
    marginTop: "5%"
  },
  canvasWrapper: {
    position: "absolute",
    top: "35%"
  },
  submitButtonArea: {
    marginTop: "5%",
    float: "right"
  },
  button: {
    marginLeft: theme.spacing(3)
  }
}));

const Profile = props => {
  const classes = useStyles();
  const profileContext = useContext(ProfileContext);
  const authContext = useContext(AuthContext);

  const { user } = authContext;

  let {
    getStream,
    profileStream,
    removeStream,
    imageLocationArr,
    setFaceCanvas,
    detectFaceArea,
    updateProfile,
    setPhoto,
    photo
  } = profileContext;

  const videoRef = useRef();
  const imgRef = useRef();
  const canvasRef = useRef();

  const [values, setValues] = useState({
    open: false,
    intervalFlag: false,
    videoElementVal: null,
    displaySizeVal: null,
    canvasVal: null
  });

  let {
    open,
    intervalFlag,
    videoElementVal,
    displaySizeVal,
    canvasVal
  } = values;

  useEffect(() => {
    if (profileStream) {
      setValues({ ...values, open: true });
    } else {
      setValues({ ...values, open: false });
    }
    // eslint-disable-next-line
  }, [profileStream]);

  useEffect(() => {
    async function stream() {
      await getStream();
    }

    stream();
    // eslint-disable-next-line
  }, []);

  useInterval(
    () => {
      detectFaceArea(videoElementVal, displaySizeVal, canvasVal);
    },
    intervalFlag ? 100 : null
  );

  const handleSubmitProfile = () => {
    setPhoto(imgRef.current.src);
    const formData = new FormData();

    if (photo) {
      const file = new File([urlToBlob(photo)], `${user.id}.png`, {
        type: "image/png",
        lastModified: Date.now()
      });
      formData.append("profile", file);
    }

    updateProfile(user.id, formData);
    handleClose();
  };

  const handleCancelProfile = () => {
    handleClose();
  };

  const handleClose = () => {
    removeStream(profileStream);
    setValues({ ...values, intervalFlag: false });
    props.history.push("/");
  };

  const faceDetecting = () => {
    const videoElement = videoRef.current.getInternalPlayer();
    const canvasElement = canvasRef.current;
    const { displaySize, canvas } = setFaceCanvas(videoElement, canvasElement);

    setValues({
      ...values,
      videoElementVal: videoElement,
      displaySizeVal: displaySize,
      canvasVal: canvas,
      intervalFlag: true
    });
  };

  const drawImage = () => {
    const [x, y, width, height] = imageLocationArr;
    const videoElement = videoRef.current.getInternalPlayer();

    const canvas = document.createElement("canvas");
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      videoElement,
      x,
      y - 50,
      width + 50,
      height + 150,
      0,
      0,
      canvas.width,
      canvas.height
    );

    imgRef.current.setAttribute("src", canvas.toDataURL("image/png"));
  };

  return (
    <div>
      <Modal open={open} className={classes.modal} onClose={handleClose}>
        <div className={classes.paper}>
          <Grid container spacing={1} className={classes.gridContainer}>
            <Grid item xs={12}>
              <div>
                <div className={classes.subTypo}>
                  얼굴 인식 후, 프로필 사진을 등록하세요
                </div>
                <div className={classes.contentTypo}>
                  사용 방법 : face detecting을 눌러 얼굴 인식 후, 파란색 윤곽이
                  나오면 take snap shot을 눌러 사진을 촬영하세요!
                </div>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.buttonArea}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="medium"
                  onClick={faceDetecting}
                >
                  Start face detecting
                </Button>
              </div>
              {profileStream ? (
                <ReactPlayer
                  playing
                  url={profileStream}
                  ref={videoRef}
                  width="100%"
                  height="100%"
                />
              ) : null}
              <div className={classes.canvasWrapper} ref={canvasRef}></div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.buttonArea}>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="medium"
                  onClick={drawImage}
                >
                  TAKE SNAP SHOT
                </Button>
              </div>
              <div className={classes.profileSnapshot}>
                <div className={classes.photoWrapper}>
                  <div className={classes.profilePhotoArea}>
                    {/* eslint-disable-next-line */}
                    <img ref={imgRef} className={classes.profilePhoto}></img>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.submitButtonArea}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="medium"
                  onClick={handleCancelProfile}
                >
                  건너뛰기
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  className={classes.button}
                  onClick={handleSubmitProfile}
                >
                  사진 등록하기
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
