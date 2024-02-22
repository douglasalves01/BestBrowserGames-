import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { CardActionArea } from "@mui/material";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import ModalAvaliate from "./ModalAvaliate";
import axios from "axios";
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
  const [avaliateData, setAvaliateData] = useState([]);
  const [ratingValue, setRatingValue] = useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  axios
    .get(`http://localhost:3000/games/avaliate/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        let responseData = response.data.data;
        let avaliates = responseData.map((item) => ({
          id: item._id,
          avaliate: item.avaliate,
          comentario: item.comentario,
        }));
        setAvaliateData(avaliates);
        if (avaliates.length > 0) {
          setRatingValue(avaliates[0].avaliate);
        }
      }
    });
  // {
  //   avaliateData.map((item) => console.log(item.avaliate));
  // }
  return (
    <Card sx={{ maxWidth: 300, minHeight: 200, maxHeight: 300 }}>
      <CardActionArea>
        {decodedToken.acesso === "0" && (
          <Rating
            name="avaliate"
            value={ratingValue}
            readOnly
            sx={{ position: "absolute", right: 0 }}
          />
        )}
        <CardMedia component="img" height="100" image={image} alt={nome} />
        <CardContent>
          <Link
            to={`/games/${id}`}
            key={id}
            style={{
              textDecoration: "none",
              underline: "none",
              color: "inherit",
            }}
          >
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
          </Link>
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
