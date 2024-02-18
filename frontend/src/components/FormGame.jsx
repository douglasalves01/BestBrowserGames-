import Alert from "@mui/material/Alert";
import PropTypes from "prop-types";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
const defaultTheme = createTheme();

const FormGame = ({ token }) => {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [urlAcesso, setUrlAcesso] = useState("");
  const [urlVideo, setUrlVideo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [sucess, setSucess] = useState("");
  console.log(setSucess);
  axios
    .get("http://localhost:3000/categoria", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        let responseData = response.data.data;
        let items = responseData.map((item) => ({
          id: item._id,
          value: item.categoria,
        }));
        setMenuItems(items);
      }
    });
  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(
        "http://localhost:3000/games/create",
        { nome, categoria, urlAcesso, urlVideo, descricao, image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          setNome("");
          setCategoria("");
          setUrlAcesso("");
          setUrlVideo("");
          setDescricao("");
          setImage("");
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
            Cadastrar Game
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              mt: 1,
              width: "550px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="nome"
              label="nome do game"
              name="nome"
              autoComplete="nome"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              autoFocus
            />
            <FormControl
              fullWidth
              sx={{
                mt: 2,
              }}
            >
              <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoria}
                label="Categoria"
                onChange={(event) => setCategoria(event.target.value)}
              >
                {menuItems.map((item) => (
                  <MenuItem key={item._id} value={item.value}>
                    {item.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              name="urlAcesso"
              label="url de acesso ao game"
              type="text"
              id="urlAcesso"
              value={urlAcesso}
              onChange={(event) => setUrlAcesso(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="urlVideo"
              label="url do vídeo do game"
              type="text"
              id="urlVideo"
              value={urlVideo}
              onChange={(event) => setUrlVideo(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="descricao"
              label="descrição"
              type="text"
              id="descricao"
              value={descricao}
              onChange={(event) => setDescricao(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="image"
              label="caminho da imagem"
              type="text"
              id="image"
              value={image}
              onChange={(event) => setImage(event.target.value)}
            />
          </Box>
          {sucess && (
            <Alert
              severity="success"
              sx={{ width: "550px" }}
              onClose={() => setSucess("")}
            >
              {sucess}
            </Alert>
          )}
          {error && (
            <Alert
              severity="warning"
              sx={{ width: "550px" }}
              onClose={() => setError("")}
            >
              {error}
            </Alert>
          )}
          <Button
            onClick={handleSubmit}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, width: "550px" }}
          >
            Cadastrar
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
FormGame.propTypes = {
  token: PropTypes.string.isRequired,
};
export default FormGame;
