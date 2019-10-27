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

  useInterval(
    () => {
      detectFaceArea(videoElementVal, displaySizeVal, canvasVal);
    },
    intervalFlag ? 100 : null
  );

  const handleOpen = async () => {
    await getStream();
  };

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
    <div className={classes.root}>
      <Typography className={classes.typo}>{"MY PROFILE"}</Typography>
      <div className={classes.contentArea}>
        <Typography className={classes.subTypo}>{"MY PROFILE"}</Typography>
        <Grid container spacing={1} className={classes.gridContainer}>
          <Grid item xs={3}>
            <div className={classes.photoWrapper}>
              <div className={classes.profilePhotoArea}>
                <img
                  className={classes.profilePhoto}
                  src="https://www.fourjay.org/myphoto/f/14/143147_avatar-png.jpg"
                  alt="avatar"
                  ref={originImgRef}
                ></img>
              </div>
            </div>
            <div className={classes.buttonArea}>
              <Button
                variant="outlined"
                color="primary"
                size="medium"
                onClick={handleOpen}
              >
                프로필 사진 다시 찍기
              </Button>
            </div>
          </Grid>
          <Grid item xs={9}>
            <TextField
              id="name"
              label="이름"
              name="name"
              className={classes.textField}
              placeholder="변경할 이름을 입력해주세요"
              variant="outlined"
              fullWidth
              autoFocus
            />
            <TextField
              id="introduction"
              label="자기소개"
              name="introduction"
              className={classes.textField}
              placeholder="자기소개를 입력해주세요"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="password"
              label="비밀번호"
              type="password"
              name="password"
              fullWidth
              className={classes.textField}
              placeholder="비밀번호 변경을 원할 경우에만 입력해주세요"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <div>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.deleteBtn}
          >
            변경 내용 반영
          </Button>
        </div>
      </div>
      <div>
        <Typography className={classes.subTypo}>
          {"ACCOUNT DELETION"}
        </Typography>
        <Typography className={classes.contentTypo}>
          {
            "계정을 삭제하면 모든 개인정보와 게시물이 삭제되며, 정보를 복구할 수 없습니다. 동의하실 경우 아래 버튼을 눌러주세요"
          }
        </Typography>
        <div>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className={classes.deleteBtn}
          >
            계정 삭제
          </Button>
        </div>
      </div>
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
