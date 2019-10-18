import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  typo: {
    fontWeight: "900",
    fontSize: "50px",
    margin: theme.spacing(3)
  },
  contentTypo: {
    fontWeight: "300",
    fontSize: "15px",
    marginBottom: "2%"
  },
  titleTypo: {
    fontWeight: "300",
    fontSize: "20px",
    marginBottom: "1%"
  },
  contentArea: {
    paddingTop: "10px",
    marginLeft: theme.spacing(3)
  },
  subTitleTypo: {
    fontWeight: "bold"
  },
  space: {
    margin: theme.spacing(2)
  }
}));

const Admin = props => {
  const classes = useStyles();

  return (
    <div>
      <div>
        <Typography className={classes.typo}>{"About"}</Typography>
        <div className={classes.contentArea}>
          <div>
            <Typography className={classes.titleTypo}>{"개발환경"}</Typography>
            <div className={classes.contentTypo}>
              <div>
                <span className={classes.subTitleTypo}>• OS</span> : Linux
                Ubuntu 18.04
              </div>
              <div>
                <span className={classes.subTitleTypo}>• Back-End</span> :
                Node.js v10.16.2, Express.js 4.16.1
              </div>
              <div>
                <span className={classes.subTitleTypo}>• Database</span> : MySQL
                v5.7.26, mongoDB v4.0, Redis v5.0.5
              </div>
              <div>
                <span className={classes.subTitleTypo}>• ORM/ODM</span> :
                Sequlize v5.19.0, Mongoose v5.7.4
              </div>
              <div>
                <span className={classes.subTitleTypo}>• Database-Env</span> :
                AWS RDS (MySQL), Cloud Atlas (mongoDB), AWS ElasticCache (Redis)
              </div>

              <div className={classes.space}></div>

              <div>
                <span className={classes.subTitleTypo}>• CI/CD</span> :
                Travis-ci
              </div>
              <div>
                <span className={classes.subTitleTypo}>• Deploy</span> : AWS
                Elastic Beanstalk, AWS S3 storage
              </div>

              <div className={classes.space}></div>

              <div>
                <span className={classes.subTitleTypo}>• Front-End</span> :
                React.js v16.9
              </div>
              <div>
                <span className={classes.subTitleTypo}>• Front-Library</span> :
                Material-ui v4.4.3
              </div>

              <div className={classes.space}></div>

              <div>
                <span className={classes.subTitleTypo}>• webRTC Library</span> :
                Simple-Peer
              </div>
              <div>
                <span className={classes.subTitleTypo}>
                  • webRTC STUN server
                </span>{" "}
                : google stun server
              </div>
            </div>
          </div>
          <div>
            <Typography className={classes.titleTypo}>{"주의사항"}</Typography>
            <div className={classes.contentTypo}>
              <div>
                • 브라우저 테스트와 webRTC 프로토콜 테스트는 chrome 브라우저를
                기반으로 실행했습니다. 서비스를 정상적으로 이용하시려면 chrome
                브라우저를 사용해주세요.
              </div>
              <div>
                • 세부적인 구현과 오류 처리가 완료되지 않은 베타 버전입니다.
                꾸준히 개선하도록 노력하겠습니다.
              </div>
              <div>
                • 브라우저 호환성과 모바일 대응도 향후 개선하도록 하겠습니다.
                감사합니다.
              </div>
            </div>
          </div>
          <div>
            <Typography className={classes.titleTypo}>
              {"개발목적 && 개발후기"}
            </Typography>
            <div className={classes.contentTypo}>
              <div>
                • 저는 기타 치는 것을 좋아합니다. 가끔은 친구들과 합주실을
                빌려서 연주하지만, 거의 대부분의 시간은 방에서 혼자 Youtube에서
                backing Track을 틀어놓고 혼자 즉흥연주를 연습합니다.
              </div>
              <div>
                • JAM이라고도 부르는 즉흥연주는 특히 기타리스트에게 가장
                재미있는 놀이이자, 실력의 바로미터이기도 합니다. 전세계에 있는
                사람과 함께 JAM을 하고 싶다라는 열망에서 기술을 찾아봤습니다.
              </div>
              <div>
                • 즉흥연주에 있어 가장 중요한 것은 레이턴시입니다. 가장 레이턴시
                비용이 적은 stream 프로토콜을 찾아야 했고, 정답은 webRTC
                였습니다.
              </div>
              <div>
                • volroom up은 아이디어의 가능성을 직접 구현해 본
                프로토타입이자, 앞으로 저의 아이디어를 발전시킬 원석이기도
                합니다.
              </div>
              <div>
                • Gamification을 적용해서 기타 히어로 게임처럼 정말 재미있게
                연주를 즐길 수 있는 공간을 언젠가는 구현하고 싶습니다.
              </div>
            </div>
            <div>
              <Typography className={classes.titleTypo}>{"연락처"}</Typography>
              <div className={classes.contentTypo}>
                <div>• E-mail : dev.dongwonkim@gmail.com</div>
                <div>
                  • Github :{" "}
                  <a href="https://github.com/dev-dongwon">
                    https://github.com/dev-dongwon
                  </a>
                </div>
                <div>
                  • Blog :{" "}
                  <a href="https://dev-dongwon.github.io">
                    https://dev-dongwon.github.io
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
