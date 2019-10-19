import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  BorderColor,
  Forum,
  LocalHospital,
  Computer
} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    width: "14%",
    borderRadius: "15px",
    border: "1px solid navy",
    color: "black",
    "&:hover": {
      backgroundColor: "navy",
      color: "white"
    }
  },
  loginButton: {
    margin: theme.spacing(1),
    width: "14%",
    borderRadius: "15px",
    border: "1px solid red",
    color: "black",
    "&:hover": {
      backgroundColor: "red",
      color: "white"
    }
  },
  typo: {
    textAlign: "center",
    fontWeight: "900",
    fontSize: "50px",
    margin: theme.spacing(3)
  },
  titleArea: {
    marginLeft: theme.spacing(4),
    marginTop: "2%"
  },
  buttonArea: {
    marginLeft: theme.spacing(4),
    marginTop: "2%"
  },
  contentArea: {
    marginLeft: theme.spacing(5),
    marginTop: "2%"
  },
  title: {
    fontSize: "65px",
    color: "white",
    fontWeight: "900",
    textShadow: "0 0 4px black"
  },
  boldTitle: {
    fontSize: "65px",
    color: "black",
    fontWeight: "900"
  },
  boldContent: {
    fontSize: "20px",
    color: "black",
    fontWeight: "500"
  },
  content: {
    textAlign: "center",
    margin: theme.spacing(4),
    fontSize: "15px",
    fontWeight: "500"
  },
  usage: {
    marginRight: "20px"
  },
  usageDesc: {
    verticalAlign: "text-top",
    marginLeft: "15px",
    marginRight: "15px",
    fontWeight: "bold"
  },
  space: {
    marginTop: "2%"
  },
  img: {
    width: "45%",
    height: "auto"
  },
  caption: {
    fontSize: "8px",
    fontWeight: "100"
  }
}));

const Home = props => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.titleArea}>
        <Typography className={classes.title}>
          {"REAL TIME, CLEAR COMM"}
        </Typography>
        <Typography className={classes.boldTitle}>{"VOLROOM UP"}</Typography>
      </div>
      <div className={classes.contentArea}>
        <div className={classes.boldContent}>
          REAL TIME VIDEO SHRAING SERVICE, VOLROOM UP
        </div>
        <div className={classes.space}></div>

        <img
          className={classes.img}
          src="https://www.pubnub.com/wp-content/uploads/2014/10/WebRTCVoice.png"
          alt="webRTC"
        ></img>

        <div>
          volroom up은 webRTC를 기반으로 리얼 타임에 가까운 화상 채팅을
          지원합니다
        </div>
        <div>
          플러그인 설치없이 간편하게 외부 카메라, 마이크 스트림을 사람들과
          공유하고,
        </div>
        <div>
          지금 내가 PC에서 사용하고 있는 프로그램의 screen과 내부 sound까지
          공유가 가능합니다
        </div>
      </div>
      <div className={classes.contentArea}>
        <Grid container>
          <Grid>
            <BorderColor></BorderColor>
          </Grid>
          <Grid>
            <span className={classes.usageDesc}>온라인 강좌</span>
          </Grid>
          <Grid>
            <Forum></Forum>
          </Grid>
          <Grid>
            <span className={classes.usageDesc}>소규모 화상회의</span>
          </Grid>
          <Grid>
            <LocalHospital></LocalHospital>
          </Grid>
          <Grid>
            <span className={classes.usageDesc}>원격 진료</span>
          </Grid>
          <Grid>
            <Computer></Computer>
          </Grid>
          <Grid>
            <span className={classes.usageDesc}>생생한 코드 리뷰(!)</span>
          </Grid>
        </Grid>
      </div>
      <div className={classes.buttonArea}>
        <Link to="/about">
          <Button className={classes.loginButton}>서비스 소개</Button>
        </Link>
        <Link to="/lobby">
          <Button className={classes.button}>이용하러 가기</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
