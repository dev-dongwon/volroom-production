import React, { useContext } from "react";
import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
  Box
} from "@material-ui/core";
import {
  Home,
  MusicNote,
  LibraryMusic,
  Dashboard,
  QuestionAnswer,
  ContactMail
} from "@material-ui/icons";
import { Link } from "react-router-dom";
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
  const authContext = useContext(AuthContext);

  const { isAuthenticated } = authContext;

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
        <Link to="/lobby">
          <ListItem button className={classes.item}>
            <LibraryMusic />
            <ListItemText primary="Play Room" className={classes.text} />
          </ListItem>
        </Link>
        <Link to="/dashboard">
          <ListItem button className={classes.item}>
            <Dashboard />
            <ListItemText primary="Dashboard" className={classes.text} />
          </ListItem>
        </Link>
  
        {isAuthenticated ? (
          <Link to="/profile">
            <ListItem button className={classes.item}>
              <ContactMail />
              <ListItemText primary="My Profile" className={classes.text} />
            </ListItem>
          </Link>
        ) : null}

        <Link to="/about">
          <ListItem button className={classes.item}>
            <QuestionAnswer />
            <ListItemText primary="About" className={classes.text} />
          </ListItem>
        </Link>
      </List>
    </div>
  );
}
