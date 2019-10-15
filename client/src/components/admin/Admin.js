import React, { useContext, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Dashboard from "./Dashboard";
import AdminContext from "../../context/admin/adminContext";
import Navigation from "./Navigation";

const useStyles = makeStyles(theme => ({
  typo: {
    fontWeight: "900",
    fontSize: "50px",
    margin: theme.spacing(3)
  },
  dashboard: {
    paddingTop: "10%"
  }
}));

const Admin = props => {
  const classes = useStyles();

  const adminContext = useContext(AdminContext);
  const { logData, loadData, type } = adminContext;

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div>
        <Typography className={classes.typo}>
          {"Statistics for Insight"}
        </Typography>
        <Navigation></Navigation>
        <div className={classes.dashboard}>
          <Dashboard logData={logData} type={type}></Dashboard>
        </div>
      </div>
    </div>
  );
};

export default Admin;
