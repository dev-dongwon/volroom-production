import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Button from "@material-ui/core/Button";
import { Person } from "@material-ui/icons";

import RoomContext from "../../context/room/roomContext";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  button: {
    margin: "5px",
    width: "80px",
    fontSize: "10px"
  },
  input: {
    display: "none"
  },
  profileName: {
    fontWeight: "bold"
  },
  icon: {
    paddingTop: "8px"
  }
}));

export default function UserList({ userList, user, connectList }) {
  const classes = useStyles();
  const roomContext = useContext(RoomContext);
  const { mySocketId, localStream, makePeer } = roomContext;

  const offerVideoCall = e => {
    const targetSocketId = e.target.id;
    makePeer(localStream, mySocketId, targetSocketId);
  };

  useEffect(() => {
    connectList.forEach(id => {
      userList.map(userObj => {
        if (id === userObj.socketId) {
          return (userObj.flag = true);
        }
      });
    });
  }, [userList, connectList]);

  return (
    <List dense className={classes.root}>
      {userList.map((userObj, index) => {
        return (
          <ListItem key={index} button>
            <ListItemAvatar>
              <Person className={classes.icon}></Person>
            </ListItemAvatar>
            {user.name === userObj.username ? (
              <span className={classes.profileName}>
                {userObj.username} : me
              </span>
            ) : (
              <span>{userObj.username}</span>
            )}

            {user.name === userObj.username ? null : (
              <ListItemSecondaryAction>
                {localStream && userObj.hasStream ? (
                  userObj.flag ? (
                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.button}
                      size="small"
                      disabled={true}
                      id={userObj.socketId}
                      onClick={offerVideoCall}
                    >
                      <span id={userObj.socketId}>connected</span>
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.button}
                      size="small"
                      id={userObj.socketId}
                      onClick={offerVideoCall}
                    >
                      <span id={userObj.socketId}>video call</span>
                    </Button>
                  )
                ) : (
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                    size="small"
                    disabled={true}
                    id={userObj.socketId}
                    onClick={offerVideoCall}
                  >
                    <span id={userObj.socketId}>video call</span>
                  </Button>
                )}

                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.button}
                  size="small"
                >
                  message
                </Button>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        );
      })}
    </List>
  );
}
