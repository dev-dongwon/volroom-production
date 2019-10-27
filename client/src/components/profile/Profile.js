import React, { useContext, useState, useEffect, useRef } from "react";
import urlToBlob from "canvas-to-blob";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal, TextField, Grid, Typography } from "@material-ui/core";
import ReactPlayer from "react-player";
import ProfileContext from "../../context/profile/profileContext";
import AuthContext from "../../context/auth/authContext";
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
    marginRight: "35px",
    marginTop: "0",
    float: "right",
    width: "250px",
    height: "45px"
  },
  submitBtn: {
    margin: theme.spacing(3),
    marginRight: "10px",
    marginTop: "0",
    float: "right",
    width: "250px",
    height: "45px"
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

const Profile = () => {
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

  const [userInfo, setUserInfo] = useState({
    name: "",
    password: "",
    introduction: "",
    photoLink: "https://www.fourjay.org/myphoto/f/14/143147_avatar-png.jpg"
  });

  let { name, password, introduction } = userInfo;

  useEffect(() => {
    if (user) {
      setUserInfo({
        ...values,
        name: user.name ? user.name : "",
        introduction: user.introduction ? user.introduction : "",
        password: "",
        photoLink: user.photo
      });
    }
  }, [user]);

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

  const onChange = e => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleOpen = async () => {
    await getStream();
  };

  const handleSubmitProfile = () => {
    originImgRef.current.src = imgRef.current.src;
    setPhoto(imgRef.current.src);
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

  const drawImage = async () => {
    const [x, y, width, height] = imageLocationArr;
    const videoElement = videoRef.current.getInternalPlayer();

    const canvas = document.createElement("canvas");
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      videoElement,
      x - 10,
      y - 50,
      width + 70,
      height + 150,
      0,
      0,
      canvas.width,
      canvas.height
    );

    imgRef.current.setAttribute("src", canvas.toDataURL("image/png"));
  };

  const submitProfile = e => {
    e.preventDefault();
    const formData = new FormData();

    if (photo) {
      const file = new File([urlToBlob(photo)], `${user.id}.png`, {
        type: "image/png",
        lastModified: Date.now()
      });
      formData.append("profile", file);
    }

    formData.append("name", name);
    formData.append("introduction", introduction);

    if (password !== "") {
      formData.append("password", password);
    }

    updateProfile(user.id, formData);
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.typo}>{"MY PROFILE"}</Typography>
      <div className={classes.contentArea}>
        <Typography className={classes.subTypo}>{"MY PROFILE"}</Typography>
        <div className={classes.contentTypo}>
          * 프로필 이미지 업데이트의 경우 서버 상태에 따라 다소 시간이 필요할 수
          있습니다
        </div>
        <form className={classes.form} noValidate>
          <Grid container spacing={1} className={classes.gridContainer}>
            <Grid item xs={3}>
              <div className={classes.photoWrapper}>
                <div className={classes.profilePhotoArea}>
                  <img
                    className={classes.profilePhoto}
                    src={userInfo.photoLink}
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
                value={name}
                fullWidth
                autoFocus
                onChange={onChange}
              />
              <TextField
                id="introduction"
                label="자기소개"
                name="introduction"
                className={classes.textField}
                placeholder="자기소개를 입력해주세요"
                variant="outlined"
                value={introduction}
                fullWidth
                onChange={onChange}
              />
              <TextField
                id="password"
                label="비밀번호"
                type="password"
                name="password"
                value={password}
                fullWidth
                className={classes.textField}
                placeholder="비밀번호 변경을 원할 경우에만 입력해주세요"
                variant="outlined"
                onChange={onChange}
              />
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  className={classes.submitBtn}
                  onClick={submitProfile}
                >
                  변경 내용 반영
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
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
