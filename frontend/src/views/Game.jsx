import Box from "@mui/material/Box";
import NavBar from "../components/NavBar";
import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";
import ContentAvaliates from "../components/ContentAvaliates";

const Games = ({ token }) => {
  const [gamesData, setGamesData] = useState([]);

  axios
    .get("http://localhost:3000/games", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        let responseData = response.data.data;
        let games = responseData.map((item) => ({
          id: item._id,
          image: item.image,
          nome: item.nome,
          descricao: item.descricao,
          urlVideo: item.urlVideo,
          urlAcesso: item.urlAcesso,
          categoria: item.categoria,
        }));
        setGamesData(games);
      }
    });
  return (
    <>
      <NavBar />
      {gamesData.map((item) => (
        <div key={item.id}>
          <img
            src={item.image}
            alt={item.nome}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      ))}
      <Box
        sx={{
          backgroundImage: "url('caminho/para/sua/imagem.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
          display: "flex",
          alignItems: "start",
          justifyContent: "start",
          pt: 10,
        }}
      >
        {gamesData.map((item) => (
          <ContentAvaliates token={token} key={item.id} id={item.id} />
        ))}
      </Box>
    </>
  );
};
Games.propTypes = {
  token: PropTypes.string.isRequired,
};
export default Games;
