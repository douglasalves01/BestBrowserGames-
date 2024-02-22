import Sidenav from "../components/Sidenav";
import Box from "@mui/material/Box";
import NavBar from "../components/NavBar";
import CardGame from "../components/Card";
import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";

const Home = ({ token }) => {
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
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: 15,
            pl: 35,
            pr: 5,
            display: "grid",
            gap: 1,
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          }}
        >
          {gamesData.map((item) => (
            <CardGame
              key={item._id}
              id={item.id}
              nome={item.nome}
              descricao={item.descricao}
              image={item.image}
              categoria={item.categoria}
              urlVideo={item.urlVideo}
              urlAcesso={item.urlAcesso}
            ></CardGame>
          ))}
        </Box>
      </Box>
    </>
  );
};
Home.propTypes = {
  token: PropTypes.string.isRequired,
};
export default Home;
