import axios from 'axios';
import { useState } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
const ContentAvaliates = ({ token, id }) => {
  const [avaliateData, setAvaliateData] = useState([]);
  const [avaliateDataRating, setAvaliateDataRating] = useState([]);
  axios
    .get(`http://localhost:3000/games/avaliates/${id}`, {
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
        setAvaliateDataRating(avaliates);
        if (avaliates.length > 0) {
          setAvaliateDataRating(avaliates[0].avaliate);
        }
      }
    });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        border: '1px solid #ccc',
        borderRadius: 4,
        width: 800,
        margin: '0 auto',
      }}
    >
      {avaliateData.map((item) => (
        <Box
          key={item.id}
          sx={{
            backgroundColor: '#f9f9f9',
            padding: 2,
            marginBottom: 2,
            borderRadius: 4,
            width: '100%',
            textAlign: 'center',
          }}
        >
          <div>{item.comentario}</div>
          <Rating
            name="avaliate"
            value={avaliateDataRating}
            readOnly
            sx={{ mt: 1 }}
          />
        </Box>
      ))}
    </Box>
  );
};
export default ContentAvaliates;
