import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Divider, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(2)
  },
  typo: {
    textAlign: "center",
    fontWeight: "900",
    fontSize: "50px",
    margin: theme.spacing(3)
  },
  subTtile: {
    textAlign: "center",
    margin: theme.spacing(3),
    marginTop: theme.spacing(5),
    fontSize: "25px",
    fontWeight: "700"
  },
  content: {
    textAlign: "center",
    margin: theme.spacing(3),
    fontSize: "15px",
    fontWeight: "500"
  }
}));

const Home = props => {
  const classes = useStyles();

  return (
    <div>
      <Typography className={classes.typo}>{"Voloom Up Service"}</Typography>
      <Divider></Divider>
      <div>
        <Typography className={classes.subTtile}>
          {"Volroom up 서비스가 뭔가요?"}
        </Typography>
        <Typography className={classes.content}>
          {
            "webRTC 프로토콜과 Socket.io를 활용, 실시간으로 CAM VIDEO와 SCREEN을 공유하며 채팅할 수 있는 화상 채팅 서비스입니다"
          }
        </Typography>
        <Typography className={classes.content}>
          {
            "현재 기본적인 로컬 로그인과 방을 만들어 실시간 스트리밍으로 화상 채팅을 할 수 있는 기본 기능을 구현했습니다"
          }
        </Typography>
        <Typography className={classes.content}>
          {"향후 private message와 친구 맺기 기능을 추가할 예정입니다"}
        </Typography>
      </div>
      <Divider variant="middle"></Divider>

      <div>
        <Typography className={classes.subTtile}>
          {"어디에 이용할 수 있나요?"}
        </Typography>
        <Typography className={classes.content}>
          {
            "실시간 비디오 컨퍼런스, 원격 의료 지원 서비스, 화상 채팅 등 여러가지 분야에 응용할 수 있습니다"
          }
        </Typography>
        <Typography className={classes.content}>
          {
            "플러그인의 도움없이, mobile/web 상관없이 클라이언트의 연결만으로 실시간 스트리밍을 할 수 있기 때문에 확장성이 좋다고 생각합니다"
          }
        </Typography>
      </div>
      <Divider variant="middle"></Divider>

      <div>
        <Typography className={classes.subTtile}>{"개발환경"}</Typography>
        <Typography className={classes.content}>
          {"OS : Linux Ubuntu 18.04"}
        </Typography>
        <Typography className={classes.content}>
          {"BackEnd : node.js, Express.js"}
        </Typography>
        <Typography className={classes.content}>
          {"FrontEnd : React.js"}
        </Typography>
        <Typography className={classes.content}>
          {"Database : MySQL, MongoDB, Redis"}
        </Typography>
      </div>
      <div className={classes.typo}>
        <Link to="/lobby">
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
          >
            서비스 이용하러 GO!
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
