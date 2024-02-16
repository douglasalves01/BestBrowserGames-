import Alert from "@mui/material/Alert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PropTypes from "prop-types";

import axios from "axios";

const defaultTheme = createTheme();

const FormCategoria = ({ token }) => {
  const [categoria, setCategoria] = useState("");
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(
        "http://localhost:3000/categoria/create",
        { categoria },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          setCategoria("");
          setSucess(response.data.message);
        }
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Cadastrar Categoria
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="categoria"
              label="Categoria"
              name="categoria"
              autoComplete="categoria"
              value={categoria}
              onChange={(event) => setCategoria(event.target.value)}
              autoFocus
            />
            {sucess && (
              <Alert severity="success" onClose={() => setSucess("")}>
                {sucess}
              </Alert>
            )}

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
              Cadastrar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
FormCategoria.propTypes = {
  token: PropTypes.string.isRequired,
};
export default FormCategoria;
