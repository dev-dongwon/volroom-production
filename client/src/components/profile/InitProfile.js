import React, { useContext, useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal, TextField, Grid, Typography } from "@material-ui/core";
import ReactPlayer from "react-player";
import ProfileContext from "../../context/profile/profileContext";
import useInterval from "use-interval";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  typo: {
    fontWeight: "900",
    fontSize: "50px",
    margin: theme.spacing(3),
    color: "black"
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
    height: "60%",
    marginLeft: "20%",
    borderRadius: "15px",
    marginTop: "10%"
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
    top: "31%"
  },
  submitButtonArea: {
    marginTop: "5%",
    float: "right"
  },
  button: {
    marginLeft: theme.spacing(3)
  }
}));

const Profile = () => {
  const classes = useStyles();
  const profileContext = useContext(ProfileContext);

  let {
    getStream,
    profileStream,
    removeStream,
    imageLocationArr,
    setFaceCanvas,
    detectFaceArea
  } = profileContext;

  const videoRef = useRef();
  const imgRef = useRef();
  const originImgRef = useRef();
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
  }, []);

  useInterval(
    () => {
      detectFaceArea(videoElementVal, displaySizeVal, canvasVal);
    },
    intervalFlag ? 100 : null
  );

  const handleSubmitProfile = () => {
    originImgRef.current.src = imgRef.current.src;
    handleClose();
  };

  const handleCancelProfile = () => {
    handleClose();
  };

  const handleClose = () => {
    removeStream(profileStream);
    setValues({ ...values, intervalFlag: false });
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
                  size="large"
                  onClick={handleCancelProfile}
                >
                  취소
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.button}
                  onClick={handleSubmitProfile}
                >
                  내 프로필 저장하기
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
