import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Container,
  Divider
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

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

export default function Signup(props) {
  const classes = useStyles();
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error) {
      setAlert(error);
    }

    clearErrors();
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    checkPassword: ""
  });

  const { name, email, password, checkPassword } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      checkPassword === ""
    ) {
      setAlert("입력되지 않은 정보가 있습니다");
    } else if (password !== checkPassword) {
      setAlert("비밀번호가 일치하지 않습니다");
    } else {
      register({ name, email, password });
    }
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
          Google ID로 회원가입
        </Button>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={onChange}
          />
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
            autoComplete="current-password"
            value={password}
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="checkPassword"
            label="check your password"
            type="password"
            id="checkPassword"
            value={checkPassword}
            onChange={onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            value="register"
            className={classes.Button}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
}
