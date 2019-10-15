import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import LobbyContext from "../../context/lobby/lobbyContext";

const useStyles = makeStyles({
  root: {
    width: 220,
    fontSize: "50px",
    marginLeft: "2rem"
  },
  btn: {
    "&:hover": {
      backgroundColor: "#ccebff"
    }
  }
});

export default function Navigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState("all");

  const lobbyContext = useContext(LobbyContext);
  const { loadRoomsByType } = lobbyContext;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    loadRoomsByType(value);
    // eslint-disable-next-line
  }, [value]);

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="ALL" value="all" className={classes.btn} />
      <BottomNavigationAction
        label="TALK"
        value="talk"
        className={classes.btn}
      />
      <BottomNavigationAction label="JAM" value="jam" className={classes.btn} />
    </BottomNavigation>
  );
}
