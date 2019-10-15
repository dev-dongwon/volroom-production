import React, { useContext } from "react";
import {
  List,
  ListItem,
  ListItemText,
  // Badge,
  makeStyles,
  Typography,
  Box
} from "@material-ui/core";
import {
  // Mail,
  Home,
  MusicNote,
  // Search,
  LibraryMusic,
  // Group
} from "@material-ui/icons";
import { Link } from "react-router-dom";

import AlertContext from "../../../context/alert/alertContext";
import AuthContext from "../../../context/auth/authContext";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: "transparent",
    textAlign: "center",
    margin: "auto",
    marginTop: "10%",
    color: "white"
  },
  text: {
    paddingLeft: "5%"
  },
  item: {
    paddingLeft: "10%",
    paddingTop: "5%",
    paddingBottom: "5%"
  },
  list: {
    marginTop: "10%"
  }
}));
export default function SimpleList() {
  const classes = useStyles();

  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;
  const { setAlert } = alertContext;

  const onPrivate = e => {
    if (!isAuthenticated) {
      setAlert("로그인이 필요한 서비스입니다");
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" letterSpacing={2}>
        <Box letterSpacing={6} m={1}>
          <span>
            <MusicNote />
          </span>{" "}
          <b>Volroom Up</b>
        </Box>
      </Typography>
      <List
        component="nav"
        aria-label="main mailbox folders"
        className={classes.list}
      >
        <Link to="/">
          <ListItem button className={classes.item}>
            <Home />
            <ListItemText primary="Home" className={classes.text} />
          </ListItem>
        </Link>
        <Link to="/lobby" onClick={onPrivate}>
          <ListItem button className={classes.item}>
            <LibraryMusic />
            <ListItemText primary="Play Room" className={classes.text} />
          </ListItem>
        </Link>
        {/* <ListItem button className={classes.item}>
          <Badge className={classes.margin} badgeContent={4} color="primary">
            <Group />
          </Badge>
          <ListItemText primary="Friends" className={classes.text} />
        </ListItem>
        <ListItem button className={classes.item}>
          <Badge className={classes.margin} badgeContent={4} color="primary">
            <Mail />
          </Badge>
          <ListItemText primary="Message" className={classes.text} />
        </ListItem>
        <Link to="/search">
          <ListItem button className={classes.item}>
            <Search />
            <ListItemText primary="Search" className={classes.text} />
          </ListItem>
        </Link> */}
      </List>
    </div>
  );
}
