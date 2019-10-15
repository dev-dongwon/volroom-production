import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

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
  }
}));

export default function UserList({ userList }) {
  const classes = useStyles();
  const roomContext = useContext(RoomContext);
  const { mySocketId, localStream, makePeer } = roomContext;

  const offerVideoCall = e => {
    const targetSocketId = e.target.id;
    makePeer(localStream, mySocketId, targetSocketId);
  };

  return (
    <List dense className={classes.root}>
      {Object.keys(userList).map((key, index) => {
        return key !== "username" && key !== "socketId" ? (
          <ListItem key={key} button>
            <ListItemAvatar>
              <Avatar alt={key} src={`/avatar.png`} />
            </ListItemAvatar>
            <span>{key}</span>
            <ListItemSecondaryAction>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                size="small"
                id={userList[key].socketId}
                onClick={offerVideoCall}
              >
                <span id={userList[key].socketId}>video call</span>
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                size="small"
              >
                message
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ) : null;
      })}
    </List>
  );
}
