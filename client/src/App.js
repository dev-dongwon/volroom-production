import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SideMenu from "./components/layout/menu/SideMenu";
import { Grid, CssBaseline } from "@material-ui/core";
import ContentArea from "./components/layout/content/ContentArea";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import LobbyState from "./context/lobby/LobbyState";
import RoomState from "./context/room/RoomState";
import AdminState from "./context/admin/AdminState";
import "./App.css";

const App = () => {
  return (
    <AlertState>
      <AuthState>
        <LobbyState>
          <RoomState>
            <AdminState>
              <Router>
                <Grid container>
                  <CssBaseline />
                  <SideMenu />
                  <ContentArea />
                </Grid>
              </Router>
            </AdminState>
          </RoomState>
        </LobbyState>
      </AuthState>
    </AlertState>
  );
};

export default App;
