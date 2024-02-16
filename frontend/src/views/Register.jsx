import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import axios from "axios";

const defaultTheme = createTheme();

const Register = () => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:3000/user/register", {
        name,
        country,
        state,
        birthDate,
        email,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          const token = response.data.token;
          localStorage.setItem("token", token);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrar
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              {" "}
              {/* Container de grade com espaçamento entre os itens */}
              <Grid item xs={12} sm={6}>
                {" "}
                {/* Define o item de grade para ocupar 12 colunas em dispositivos pequenos e 6 colunas em dispositivos médios e maiores */}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Nome completo"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {" "}
                {/* Define o item de grade para ocupar 12 colunas em dispositivos pequenos e 6 colunas em dispositivos médios e maiores */}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="country"
                  label="País de nascimento"
                  name="country"
                  autoComplete="pais"
                  value={country}
                  onChange={(event) => setCountry(event.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {" "}
                {/* Define o item de grade para ocupar 12 colunas em dispositivos pequenos e 6 colunas em dispositivos médios e maiores */}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="state"
                  label="Estado"
                  name="state"
                  autoComplete="estado"
                  value={state}
                  onChange={(event) => setState(event.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6} mt={1}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Data de Nascimento"
                      value={birthDate}
                      onChange={(date) => setBirthDate(date)} // Atualizando o valor de birthDate
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </DemoContainer>
                </LocalizationProvider>{" "}
              </Grid>
              <Grid item xs={12} sm={6}>
                {" "}
                {/* Define o item de grade para ocupar 12 colunas em dispositivos pequenos e 6 colunas em dispositivos médios e maiores */}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {" "}
                {/* Define o item de grade para ocupar 12 colunas em dispositivos pequenos e 6 colunas em dispositivos médios e maiores */}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>

            {error && (
              <Alert severity="warning" onClose={() => setError("")}>
                {error}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrar
            </Button>
            <Grid container justifyContent="flex-start">
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Já tem uma conta? Faça o login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
