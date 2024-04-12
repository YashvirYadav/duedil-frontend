import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice/authslice";
import { ILoginRequest } from "../../redux/authSlice/user.type";
import { AppDispatch } from "../../app/store";
import { useNavigate } from "react-router-dom";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

export default function SignIn() {
  const navigate = useNavigate();

  const [errorEmailID, setErrorEmailID] = React.useState<boolean>(false);
  const [errorPassword, setErrorPassword] = React.useState<boolean>(false);

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = () => {
    if (email === "" || (email && email?.length < 3)) {
      setErrorEmailID(true);
    }
    if (password === "" || (password && password?.length < 3)) {
      setErrorPassword(true);
    }

    if (email && password) {
      const loginRequest: ILoginRequest = { email: email, password: password };
      dispatch(login(loginRequest as ILoginRequest)).then(() => {
        navigate("/admin");
      });
    }
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          backgroundColor: colors.primary[400],
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={errorEmailID}
            value={email}
            onChange={(e) => {
              setErrorEmailID(false);
              setEmail(e.target.value);
            }}
            helperText={errorEmailID ? "Invalid email" : ""} // Error message
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={errorPassword}
            value={password}
            onChange={(e) => {
              setErrorPassword(false);
              setPassword(e.target.value);
            }}
            helperText={errorPassword ? "Invalid password" : ""} // Error message
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="secondary"
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" color="#ffff">
                Forgot password?
              </Link>
            </Grid>

            <Grid item>
              <Link href="#" variant="body2" color="#ffff">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
