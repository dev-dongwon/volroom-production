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
          <Typography className={classes.titleTypo}>
            {"프로젝트 소개"}
          </Typography>
          <div className={classes.contentTypo}>
            <div>
              • webRTC 프로토콜을 이용한 실시간 화상 채팅 웹 어플리케이션
            </div>
            <div>
              • 사용자 cam video 및 외부 audio 공유, 화면 screen video 및 internal audio 공유 가능
            </div>
            <div>
              • 소규모 비디오 컨퍼런스, 원격 진료, 온라인 강의 등 다양하게 응용 가능
            </div>
          </div>
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
                • 기본적인 기능은 구현이 되었지만 세부적인 부분에서 예기치 않은 오류가 발생할 수 있습니다.
                꾸준히 문제점을 파악하고 개선하도록 노력하겠습니다.
              </div>
              <div>
                • 브라우저 호환성과 모바일 대응도 향후 개선하도록 하겠습니다.
                감사합니다.
              </div>
            </div>
          </div>
          <div>
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
