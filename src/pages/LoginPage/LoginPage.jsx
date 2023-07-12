import { Box, Button, CircularProgress, Container, CssBaseline, Divider, Paper, TextField, Typography } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import UserSessionHelper from '../../helpers/UserSessionHelper';
import authService from '../../services/auth.service';
import car from '../../assets/images/login-car.jpg';
import logo from '../../assets/images/logo-white-nobg.png';

export default function LoginPage() {

  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);

  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (email === "" || password === "") {
      setError(true);
      setLoading(false);
      return;
    }

    const user = {
      email: email,
      password: password,
    };

    const res = await authService.login(user);
    if (res?.status === 200) {
      UserSessionHelper.setUser(res?.data);
      history?.location?.state
        ? history.push(history?.location?.state?.from?.pathname)
        : history.push("/home");
    } else {
      setError(true);
    }
    setLoading(false);
    setTimeout(() => { setError(false) }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  return (
    <CssBaseline>
      <Container maxWidth={false} sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: `url(${car})`, backgroundSize: 'cover' }} disableGutters>
        <Paper elevation={5} sx={{ position: 'absolute', right: '100px', height: '80vh', width: '25%', opacity: '0.9', background: '#000', color: '#fff' }}>
          <Box sx={{ width: '90%', margin: '0 auto' }}>
            <img src={logo} alt="logo" style={{ width: '100%' }} />
          </Box>
          <Typography variant="h4" align="center" sx={{ color: '#fff', marginBottom:3 }}>
            Login
          </Typography>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <TextField
              label="Email"
              variant="outlined"
              required
              error={error}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                margin: '10px', width: '60%',
                fieldset: { borderColor: "white" },
                "& .MuiInputLabel-root": {
                  color: "#fff",
                },
                '& label.Mui-focused': {
                  color: '#fff',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#fff',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#fff',
                  },
                  '&:hover fieldset': {
                    borderColor: '#fff',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#fff',
                  },
                  color: '#fff'
                }
              }} />
            <TextField
              label="Password"
              variant="outlined"
              required
              error={error}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                margin: '10px', width: '60%',
                fieldset: { borderColor: "white" },
                "& .MuiInputLabel-root": {
                  color: "#fff",
                },
                '& label.Mui-focused': {
                  color: '#fff',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#fff',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#fff',
                  },
                  '&:hover fieldset': {
                    borderColor: '#fff',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#fff',
                  },
                  color: '#fff'
                },
              }}
            />
            <Typography
              variant="body1"
              align="center"
              sx={{ color: "#fff", marginTop: 3 }}
            >
              Don't have an account?{" "}
              <a
                href="/register"
                style={{
                  color: "#fff",
                }}
              >
                Sign up
              </a>
            </Typography>
            {
              loading ? <CircularProgress /> : <Button
                variant="contained"
                sx={{ width: '80%', marginTop: '20px', backgroundColor: '#16606d', opacity: 1 }}
                onClick={handleLogin}
                onKeyDown={handleKeyPress}
              >
                Login
              </Button>
            }
          </Box>
        </Paper>
      </Container>
    </CssBaseline>
  )
}
