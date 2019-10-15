import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AdminContext from "../../context/admin/adminContext";

const useStyles = makeStyles({
  root: {
    width: 250,
    fontSize: "50px",
    marginLeft: "2rem"
  },
  btn: {
    width: "500px",
    "&:hover": {
      backgroundColor: "#ccebff"
    }
  }
});

export default function Navigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState("browser");

  const adminContext = useContext(AdminContext);
  const { changeType } = adminContext;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    changeType(value);
    // eslint-disable-next-line
  }, [value]);

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        label="BROWSER"
        value="browser"
        className={classes.btn}
      />
      <BottomNavigationAction label="OS" value="os" className={classes.btn} />
      <BottomNavigationAction
        label="USER"
        value="time"
        className={classes.btn}
      />
    </BottomNavigation>
  );
}
