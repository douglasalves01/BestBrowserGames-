import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import CardGame from '../components/Card';
import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';

const BestBrowserGames = ({ token }) => {
  const [gamesData, setGamesData] = useState([]);

  axios
    .get('http://localhost:3000/games', {
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
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: 12,
            pl: 8,
            pr: 5,
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          }}
        >
          {gamesData.map((item) => (
            <CardGame
              key={item.id}
              id={item.id}
              nome={item.nome}
              descricao={item.descricao}
              image={item.image}
              categoria={item.categoria}
              urlVideo={item.urlVideo}
              urlAcesso={item.urlAcesso}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};
BestBrowserGames.propTypes = {
  token: PropTypes.string.isRequired,
};
export default BestBrowserGames;
