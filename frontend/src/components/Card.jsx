import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import ModalAvaliate from "./ModalAvaliate";
export default function CardGame({
  id,
  image,
  nome,
  descricao,
  urlAcesso,
  urlVideo,
  categoria,
}) {
  const handleOpenUrl = (url) => {
    window.open(url, "_blank");
  };
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Card sx={{ maxWidth: 300, minHeight: 200, maxHeight: 300 }}>
      <CardActionArea>
        <CardMedia component="img" height="100" image={image} alt={nome} />
        <CardContent>
          <Typography
            sx={{ fontWeight: "bold", fontSize: 16 }}
            gutterBottom
            variant="body2"
            component="div"
          >
            {nome}
          </Typography>
          <Typography variant="body3">{categoria}</Typography>
          <Typography variant="body2" color="text.secondary">
            {descricao}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: -1,
            }}
          >
            <Button
              onClick={() => handleOpenUrl(urlAcesso)}
              sx={{ fontWeight: "bold" }}
            >
              Acessar
            </Button>
            <Button
              onClick={() => handleOpenUrl(urlVideo)}
              sx={{ fontWeight: "bold" }}
            >
              Assistir
            </Button>
            {decodedToken.acesso === "0" && (
              <Button onClick={handleOpen} sx={{ fontWeight: "bold" }}>
                Avaliar
              </Button>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
      <ModalAvaliate
        token={token}
        id={id}
        nome={nome}
        open={open}
        handleClose={handleClose}
      />
    </Card>
  );
}
CardGame.propTypes = {
  id: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  categoria: PropTypes.string.isRequired,
  urlAcesso: PropTypes.string.isRequired,
  urlVideo: PropTypes.string.isRequired,
  descricao: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
