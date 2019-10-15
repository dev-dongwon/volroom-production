import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";
import Signup from "../../auth/Signup";
import Login from "../../auth/Login";
import Alert from "../../layout/alert/Alert";
import Search from "../../search/Search";
import Home from "../../home/Home";
import Lobby from "../../lobby/Lobby";
import Room from "../../room/Room";
import Admin from "../../admin/Admin";
import PrivateRoute from "../../../components/routing/PrivateRoute";
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
          <Route exact path="/search" component={Search} />
          <Route exact path="/lobby" component={Lobby} />
          <Route exact path="/admin" component={Admin} />
          <PrivateRoute
            exact
            path="/rooms/:namespace/:roomId"
            component={Room}
          />
        </Switch>
      </Grid>
    </Fragment>
  );
};

export default ContentArea;
