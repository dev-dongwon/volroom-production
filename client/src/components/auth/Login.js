import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Container,
  Divider
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import detect from "../../utils/userDetector";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(25),
    textDecoration: "none",
    backgroundColor: "white"
  },
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  Button: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1.5, 0)
  },
  divider: {
    marginTop: theme.spacing(2)
  },
  subtitle: {
    textAlign: "center",
    marginTop: theme.spacing(2)
  }
}));

export default function SignIn(props) {
  const classes = useStyles();
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error) {
      setAlert(error);
    }

    clearErrors();
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("입력되지 않은 정보가 있습니다");
      return;
    }

    const browser = detect.getBrowser().name;
    const os = detect.getOS().name;
    login({ email, password, os, browser });
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <div>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.Button}
        >
          Google Login
        </Button>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            autoFocus
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            autoComplete="current-password"
            onChange={onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            value="login"
            className={classes.Button}
            onClick={onSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/">Forgot password?</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.subtitle}>
        <b>아직 아이디가 없으신가요?</b>
      </div>
      <div>
        <Link to="/signup">
          <Button fullWidth variant="outlined" className={classes.Button}>
            회원가입
          </Button>
        </Link>
      </div>
    </Container>
  );
}
