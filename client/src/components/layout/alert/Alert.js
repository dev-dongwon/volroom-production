import React, { useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import AlertContext from "../../../context/alert/alertContext";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: "8%"
  }
}));

const Alert = () => {
  const alertContext = useContext(AlertContext);
  const classes = useStyles();

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map(alert => (
      <div key={alert.id}>
        <Snackbar
          className={classes.root}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={true}
          message={alert.msg}
        />
      </div>
    ))
  );
};

export default Alert;
