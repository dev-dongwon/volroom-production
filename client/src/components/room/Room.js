import React, { useContext, useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ReactPlayer from "react-player";
import Fab from "@material-ui/core/Fab";
import { AirplayOutlined, Person } from "@material-ui/icons";

import AuthContext from "../../context/auth/authContext";
import RoomContext from "../../context/room/roomContext";
import AlertContext from "../../context/alert/alertContext";
import UserList from "./UserList";

import {
  Chip,
  Button,
  TextField,
  AppBar,
  IconButton,
  Typography,
  Grid
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  title: {
    marginTop: "5%"
  },
  chatMenu: {
    textAlign: "right"
  },
  root: {
    margin: "1rem",
    padding: theme.spacing(3, 2),
    height: "95vh"
  },
  flex: {
    display: "flex"
  },
  topicsWindow: {
    width: "80%",
    height: "auto"
  },
  chatWindow: {
    width: "350px",
    height: "95vh"
  },
  chatBox: {
    height: "75%",
    backgroundColor: "white",
    overflow: "auto"
  },
  messageBox: {
    height: "10%",
    backgroundColor: "white"
  },
  button: {
    marginTop: "10px",
    textAlign: "right"
  },
  chip: {
    marginLeft: "1rem",
    marginRight: "1rem"
  },
  message: {
    alignItems: "center"
  },
  messageWrapper: {
    padding: "5px"
  },
  textBox: {
    width: "330px"
  },
  server: {
    textAlign: "center",
    margin: "15px auto 15px auto"
  },
  entrance: {
    fontWeight: "700"
  },
  myPlayerArea: {
    width: "100%",
    height: "46vh"
  },
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  deleteButton: {
    margin: theme.spacing(3),
    width: "10%",
    fontSize: "10px",
    borderRadius: "10px"
  },
  videoBox: {
    height: "600px"
  }
}));

const Room = ({ match, history }) => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const roomContext = useContext(RoomContext);
  const alertContext = useContext(AlertContext);

  const [values, setValues] = useState({
    topic: match.params.namespace,
    roomId: match.params.roomId,
    userListFlag: false
  });

  const { roomId, topic, userListFlag } = values;

  const { user } = authContext;
  const { setAlert } = alertContext;

  let {
    chatList,
    userList,
    leaveRoom,
    sendChat,
    localStream,
    windowBackEvent,
    joinRoom,
    currentRoom,
    remoteStream,
    setStream,
    deleteRoom
  } = roomContext;

  useEffect(() => {
    async function join() {
      await joinRoom(topic, roomId, user);
    }

    if (user) {
      join();
    }

    windowBackEvent();
    // eslint-disable-next-line
  }, [user, roomId, localStream]);

  const videoRef = useRef(null);

  const [textValue, changeTextValue] = useState("");

  const sendChatAction = msgObj => {
    sendChat(msgObj);
  };

  const getScreen = () => {
    setStream("screen");
  };

  const getCam = () => {
    setStream("video");
  };

  const onUserList = () => {
    if (!userListFlag) {
      setValues({ ...values, userListFlag: true });
      return;
    }
    setValues({ ...values, userListFlag: false });
  };

  const onChange = e => changeTextValue(e.target.value);

  const onKeyHandler = e => {
    if (e.key === "Enter") {
      onSubmit(e);
    }
  };

  const onExit = () => {
    leaveRoom();
    history.push("/lobby");
  };

  const onDelete = e => {
    deleteRoom(currentRoom.topic, currentRoom.roomId, user);
    history.push("/lobby");
  };

  const onSubmit = e => {
    if (!user) {
      setAlert("로그인`이 필요합니다");
      return;
    }

    if (textValue === "") {
      setAlert("내용을 입력해주세요");
      return;
    }

    const msgObj = {
      roomId,
      from: user.name,
      msg: textValue
    };

    sendChatAction(msgObj);
    changeTextValue("");
  };

  return (
    <div className={classes.root}>
      <div className={classes.flex}>
        <div className={classes.topicsWindow}>
          <div className={classes.myPlayerArea}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {/* <Backspace fontSize="large" onClick={onLeave} /> */}
                <Fab
                  variant="extended"
                  size="medium"
                  color="primary"
                  className={classes.fab}
                  onClick={getCam}
                >
                  <Person className={classes.extendedIcon} />
                  Get My CAM
                </Fab>
                <Fab
                  variant="extended"
                  size="medium"
                  color="secondary"
                  className={classes.fab}
                  onClick={getScreen}
                >
                  <AirplayOutlined className={classes.extendedIcon} />
                  Get my Screen
                </Fab>
              </Grid>
              <Grid item xs={12} sm={8} className={classes.videoBox}>
                <ReactPlayer
                  playing
                  url={localStream}
                  width="100%"
                  height="100%"
                  ref={videoRef}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                {remoteStream ? (
                  <ReactPlayer
                    playing
                    url={remoteStream}
                    width="80%"
                    height="80%"
                  />
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h3">
                  {currentRoom ? currentRoom.roomName : null}
                </Typography>
                <Typography variant="h6">
                  {currentRoom ? `by ${currentRoom.hostId}` : null}
                  {user && currentRoom && user.name === currentRoom.hostId ? (
                    <Button
                      className={classes.deleteButton}
                      variant="outlined"
                      size="small"
                      color="secondary"
                      onClick={onDelete}
                    >
                      Delete Room
                    </Button>
                  ) : (
                    <Button
                      className={classes.deleteButton}
                      variant="outlined"
                      size="small"
                      color="secondary"
                      onClick={onExit}
                    >
                      Exit Room
                    </Button>
                  )}
                </Typography>
              </Grid>
            </Grid>
          </div>
        </div>
        <div className={classes.chatWindow}>
          <AppBar position="static">
            <div className={classes.chatMenu}>
              <span>LIVE CHAT</span>
              <span>
                <IconButton color="inherit" onClick={onUserList}>
                  <Person />
                </IconButton>
              </span>
            </div>
          </AppBar>
          {userListFlag ? (
            <div className={classes.chatBox}>
              <UserList userList={userList}></UserList>
            </div>
          ) : (
            <div className={classes.chatBox}>
              {chatList.map((chat, i) => {
                return chat.from === "server:entrance" ? (
                  <div className={classes.server} key={i}>
                    <span className={classes.entrance}>{chat.msg}</span>
                    <span>님이 입장하셨습니다</span>
                  </div>
                ) : (
                  <div
                    className={classes.flex}
                    key={i}
                    // eslint-disable-next-line
                    className={classes.messageWrapper}
                  >
                    <Chip label={chat.from} className={classes.chip} />
                    {chat.msg}
                  </div>
                );
              })}
            </div>
          )}
          <div className={classes.messageBox}>
            <div>
              <TextField
                id="standard-name"
                className={classes.textBox}
                placeholder="Send a chat"
                value={textValue}
                onChange={onChange}
                onKeyDown={onKeyHandler}
              />
            </div>
            <div className={classes.button}>
              <Button variant="contained" color="primary" onClick={onSubmit}>
                send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
