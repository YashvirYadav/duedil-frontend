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
import { styled } from "@mui/material/styles";
import { useDispatch } from 'react-redux';
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

// const CssTextField = styled(TextField, {
//   shouldForwardProp: (props) => props !== "focusColor",
// })((p) => ({
//   // input label when focused
//   "& label.Mui-focused": {
//     color: "#FFF",
//   },
//   // focused color for input with variant='standard'
//   "& .MuiInput-underline:after": {
//     borderBottomColor: "#FFF",
//   },
//   // focused color for input with variant='filled'
//   "& .MuiFilledInput-underline:after": {
//     borderBottomColor: "#FFF",
//   },
//   // focused color for input with variant='outlined'
//   "& .MuiOutlinedInput-root": {
//     "&.Mui-focused fieldset": {
//       borderColor: "#FFF",
//     },
//   },
// }));

// TODO remove, this demo shouldn't need to reset the theme.

export default function SignIn() {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();

    if (email && password) {
      const loginRequest: ILoginRequest = { email: email, password: password };
      dispatch(login(loginRequest as ILoginRequest)).then()
      navigate("/admin");
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
