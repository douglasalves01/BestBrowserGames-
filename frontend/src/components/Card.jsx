import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

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

  return (
    <Card sx={{ maxWidth: 250, maxHeight: 350 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {nome}
          </Typography>
          <Typography variant="body2">{categoria}</Typography>
          <Typography variant="body2" color="text.secondary">
            {descricao}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
