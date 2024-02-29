import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import ContentAvaliates from '../components/ContentAvaliates';
import { useParams } from 'react-router-dom';

const Games = ({ token }) => {
  const [gamesData, setGamesData] = useState([]);
  const { id } = useParams();
  axios
    .get(`http://localhost:3000/games/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        let responseData = response.data.data;
        const game = {
          id: responseData._id,
          image: responseData.image,
          nome: responseData.nome,
          descricao: responseData.descricao,
          urlVideo: responseData.urlVideo,
          urlAcesso: responseData.urlAcesso,
          categoria: responseData.categoria,
        };
        setGamesData(game);
      }
    });
  return (
    <>
      <NavBar />

      <div key={gamesData.id}>
        <img
          src={gamesData.image}
          alt={gamesData.nome}
          style={{ maxWidth: '100%', minWidth: '100%', height: '100%' }}
        />
      </div>
      <Box
        sx={{
          backgroundImage: "url('caminho/para/sua/imagem.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100%',
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'start',
          pt: 10,
        }}
      >
        <ContentAvaliates token={token} key={gamesData.id} id={gamesData.id} />
      </Box>
    </>
  );
};
Games.propTypes = {
  token: PropTypes.string.isRequired,
};
export default Games;
