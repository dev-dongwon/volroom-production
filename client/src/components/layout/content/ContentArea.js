import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";
import Signup from "../../auth/Signup";
import Login from "../../auth/Login";
import Alert from "../../layout/alert/Alert";
import Home from "../../home/Home";
import Lobby from "../../lobby/Lobby";
import Room from "../../room/Room";
import Admin from "../../admin/Admin";
import About from "../../about/About";
import Profile from "../../profile/Profile";
import InitProfile from "../../profile/InitProfile";
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const ContentArea = () => {
  return (
    <Fragment>
      <Grid item xs={false} sm={2} md={2}></Grid>
      <Grid item xs={false} sm={10} md={10} className="content">
        <Alert />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/lobby" component={Lobby} />
          <Route exact path="/dashboard" component={Admin} />
          <Route exact path="/about" component={About} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/initProfile" component={InitProfile} />
          <Route exact path="/rooms/:namespace/:roomId" component={Room} />
        </Switch>
      </Grid>
    </Fragment>
  );
};

export default ContentArea;
